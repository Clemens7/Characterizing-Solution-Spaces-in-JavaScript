# adapted version, original: https://www.tutorialspoint.com/gensim/gensim_doc2vec_model.htm
# imports 
import gensim
import re
import os
import math
import numpy as np
np.set_printoptions(threshold=np.inf)   #so the output is not capped
import nltk
import json
# for commandline arguments
import sys
import time
import matplotlib.pyplot as plt
import pandas as pd

from nltk.cluster import KMeansClusterer, cosine_distance
from nltk.tokenize import sent_tokenize, word_tokenize
from util import nltkInertia, getOptK, findOptK, findOptKSilhouette, findOptKMeanShift, findOptKMiniBatch
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans, MeanShift, Birch, AgglomerativeClustering, AffinityPropagation
from sklearn.preprocessing import FunctionTransformer
from sklearn.pipeline import Pipeline
from sklearn.decomposition import PCA, TruncatedSVD
from scipy import sparse
from gensim.models import Doc2Vec


#"""### Tokenizing the document and filtering the tokens"""
def tokenize(train_texts): 
    tokens = [word for sent in nltk.sent_tokenize(train_texts) for word in nltk.word_tokenize(sent)]
    return tokens


CLUSTERINGPATH = r"./clustering"
JSCoveragePATH = r"./../GatheringJSCoverage/JSCoverage"
perTestCasePATH = os.path.join(JSCoveragePATH, "perTestCase")
OVERALL = "overall"
clusteringRepeats = 50

testCases = os.listdir(os.path.join(perTestCasePATH))

# https://stackoverflow.com/questions/3765533/python-array-with-string-indices
data = []
proccessedDataPerGroup = {}
clusteringPerGroupList = []
clusteringPerGroup = {}
groupPerClusterPerTestcase = {}
cntOfTestCases = 0
cntOfGroups = 0
usedGroups = {}
groupAccordance = {}
#get usedGroups
coverageResultFolders = os.listdir(JSCoveragePATH)

groups = []

for folderName in coverageResultFolders:
    if re.search("\d+", folderName):
        currGrp = int(folderName)
        if not currGrp in usedGroups:
            usedGroups[currGrp] = 1

args = sys.argv
# the first argument is the name of this file
args.pop(0)
specifiedTestCases = []
if(len(args) > 0):
    for testCase in testCases:
        for arg in args:
            arg = re.sub("_", '-', arg)
            if re.search(arg.lower(), testCase.lower()):
                specifiedTestCases.append(testCase)
else:
    specifiedTestCases = testCases

# if the given parameter(s) can not be found in any test
if len(specifiedTestCases) < 1:
    specifiedTestCases = testCases
   
print("Running the clustering for the following Testcases:")
print(specifiedTestCases)


for testCase in specifiedTestCases:
    dataPerGroup = {}
    coverageFiles = os.listdir(os.path.join(perTestCasePATH, testCase))
    for fileName in coverageFiles:
        # always using the last element (it should not be that there are more than one number in the name, 
        # but if so, then they must be the same!)
        currGrp = re.findall("\d+", fileName)
        currGrp = int(currGrp[len(currGrp)-1])
        if not currGrp in dataPerGroup:
            dataPerGroup[currGrp] = ""
        
        # Get input
        rawDataTmp = []
        with open(os.path.join(perTestCasePATH, testCase, fileName), 'r') as f:
            input = f.readlines() 
            for line in input:
                if not re.match(r"^\s*(\/\/|\/\*\*|\*\/|\*)", line):
                    rawDataTmp.append(line)
            ##rawDataTmp = f.readlines()
            ##rawDataTmp = f.read()
        #dataPerGroup[currGrp] = [re.sub("[^a-zA-Z]", ' ', rawLine) for rawLine in rawDataTmp]
        dataPerGroup[currGrp] += ''.join(rawDataTmp)
    cntOfTestCases += 1
    
    
    data = []
    dataDictionary = dict()
    for grp in dataPerGroup:

        #write data per group to a file
        if not os.path.exists(r"./data"):
            os.makedirs(r"./data")

        with open(r"./data/"+testCase + "_" + str(grp) + ".txt", 'w') as f:
            code = ""
            #for writing the data into the data-file
            f.write(dataPerGroup[grp])

        #dataPerGroup[grp] = []
        cntOfGroups += 1
    print(testCase)
        
    print("\tCombining the data into the documents")

            
    ## extract  words out of the document and move it to other object
    
    allCode = []
    clusteringGroupMapping = {}
    for (cnt, grp) in enumerate(dataPerGroup):
        tokens = tokenize(dataPerGroup[grp])
        allCode.append(gensim.models.doc2vec.TaggedDocument(tokens, ["'" + str(grp) + "'"]))
        clusteringGroupMapping[cnt] = grp;

        
print("\tCreating and training the Doc2Vec model")            
d2v_model = Doc2Vec(allCode, vector_size = 200, min_count = 5,dm = 0, epochs=100)
d2v_model.train(allCode, total_examples=d2v_model.corpus_count, epochs=100)

##PCA
pca = PCA(n_components=2).fit(d2v_model.docvecs.vectors_docs)
datapoint = pca.transform(d2v_model.docvecs.vectors_docs)


##Plot the clustering result
plt.figure
plt.scatter(datapoint[:, 0], datapoint[:, 1])
plt.savefig('./clustering/p2a_without_comments'+str(run)+'.png')
plt.clf()

## K-Means clustering
#kmeans_model = KMeans(n_clusters = 3, init='k-means++', n_init = 2000, max_iter = 6000)  
#X = kmeans_model.fit(d2v_model.docvecs.doctag_syn0)
#labels=kmeans_model.labels_.tolist()
#lusters = kmeans_model.fit_predict(d2v_model.docvecs.doctag_syn0)


  
"""  
#Elbow Method           
nc = range(1,len(clusteringGroupMapping))
kmeans = []
score = []
kmeans = [KMeans(n_clusters = i, n_init = 100, max_iter = 500) for i in nc]               
#kmeans = [KMeans(n_clusters = i, n_init = 100, max_iter = 500) for i in nc]               
score = [kmeans[i].fit(d2v_model.docvecs.doctag_syn0).score(d2v_model.docvecs.doctag_syn0) for i in range(len(kmeans))]
# Plot the elbow
plt.plot(nc,score)
plt.xlabel('Number of Clusters')
plt.xlabel('Number of Clusters')
plt.ylabel('Score')
plt.title('Elbow Curve')
plt.savefig('./doc2vec_P2A/KMeans_without_comments.png')
plt.clf()  
"""        

    
    
"""
    ### AffinityPropagation
    ## https://scikit-learn.org/stable/modules/generated/sklearn.cluster.AffinityPropagation.html
    ## https://www.machinecurve.com/index.php/2020/04/18/how-to-perform-affinity-propagation-with-python-in-scikit/
    
    clusterPerGroup = {}
    current_cluster = {}
    for run in range(1,2,1):
        afprop = AffinityPropagation(max_iter=1000, convergence_iter=30, random_state=None)
        afprop.fit_predict(dataFrame)
        print(afprop.labels_)
        plt.clf()
        plt.hist(afprop.labels_)
        plt.savefig("./histogram-AFPROP" + str(run) + ".png")
        
        
        for i in set(afprop.labels_):
            if not str(i) in clusterPerGroup:
                clusterPerGroup[str(i)] = {}
            if not str(run) in clusterPerGroup[str(i)]:
                clusterPerGroup[str(i)][str(run)] = []
            current_cluster = [clusteringGroupMapping[x] for x in list(np.where(afprop.labels_ == i)[0])]
            
            clusterPerGroup[str(i)][str(run)] = current_cluster
            #if not str(i) in clusteringPerGroup:
            #    clusteringPerGroup[str(i)] = []
            #clusteringPerGroup[str(i)].append(str(v))
    with open("./AFPROP.json", 'w') as f:
        json.dump(clusterPerGroup, f, indent = 4)
    
    CLUSTERS = len(set(afprop.labels_))




    ### Hierarchical approach
    #from scipy.cluster import hierarchy
    
    #z = hierarchy.linkage(dataFrame, 'ward')
    #plt.clf()
    #plt.figure(figsize=(50,25))
    #dn = hierarchy.dendrogram(z, labels = [clusteringGroupMapping[x] for x in [0,1,2,3]], leaf_rotation=90.)
    #dn = hierarchy.dendrogram(z, labels = clusteringGroupMapping, leaf_rotation=90., leaf_font_size=20
    #                            , count_sort = False, distance_sort = False)
    #plt.axhline(y=, c='k')
    #plt.savefig("./dendrogram.png")

"""
