# for the filesystem
import os
# for reges
import re
# for the sqrt
import math
# for handling arrays
import numpy as np
# for clustering with k-means
import nltk
# for using json
import json
# for tfidf-model
import gensim

import matplotlib.pyplot as plt


from nltk.cluster import KMeansClusterer, cosine_distance
from util import nltkInertia, getOptK, findOptK
from sklearn.decomposition import PCA

JSCoveragePATH = r"./../GatheringJSCoverage/JSCoverage"
CLUSTERINGPATH = r"./clustering"
OVERALL = "overall"


with open("resultsPerTestCase.json") as f:
    inputData = json.load(f)


for testCase in inputData:
    for grp in inputData[testCase]:
        INFOTYPESCNT = len(inputData[testCase][grp])
        break
    break


# https://towardsdatascience.com/natural-language-processing-feature-engineering-using-tf-idf-e8b9d00e7e76
# only using TF because every group of the data has the same types (IF, FOR, CODELINES)
# every one has CODELINES --> with TFIDF it would get filtered away
def computeTF(data):
    tfDictForOneGroup = {}
    tfDict = []
    
    for dataForOneGroup in data:
        for word, count in dataForOneGroup:
            tfDictForOneGroup[word] = count ###/ float(INFOTYPESCNT)

        tfDict.append(tfDictForOneGroup)
        tfDictForOneGroup = {}
        
    return tfDict
    
  
 
# Guess for the amount of clusters
# https://stackoverflow.com/questions/1793532/how-do-i-determine-k-when-using-k-means-clustering/28944305#28944305
CLUSTERS = round(math.sqrt(INFOTYPESCNT/2))

usedGroups = {}
groupsPerTestCase = []
clusteringPerGroup = {}
clusteringPerGroupList = []
groupPerClusterPerTestcase = {}

#get usedGroups
coverageResultFolders = os.listdir(JSCoveragePATH)
for folderName in coverageResultFolders:
    if re.search("\d+", folderName):
        currGrp = int(folderName)
        if not currGrp in usedGroups:
            usedGroups[currGrp] = 1

for testCase in inputData:
    data = []
    dataForOneGroup = []
    groupsPerTestCase = []
    
    print(testCase)
    
    for group in inputData[testCase]:       
        i = 0
        point = [0] * INFOTYPESCNT
        groupNumber = int(group)
        
        groupsPerTestCase.append(groupNumber)
  
        for index, infotype in enumerate(inputData[testCase][group]):
            #point[i] = inputData[testCase][group][infotype]
            #i += 1
            tuple = (index, inputData[testCase][group][infotype])
            dataForOneGroup.append(tuple)
        #data.append(np.array(point))
        data.append(dataForOneGroup)
        dataForOneGroup = []

    tf = computeTF(data)

    data = []
    for doc in tf:
        point = [0] * INFOTYPESCNT
        for id in doc:
            point[id] = doc[id]
        
        data.append(np.array(point))
    
    print("\tfinding optimal K")
    
    #optK = getOptK(data, round(len(groupsPerTestCase)/2+1), INFOTYPESCNT, 11)
    #optK = getOptK(data, round(len(groupsPerTestCase)/2+1), INFOTYPESCNT)
    optK = findOptK(data, round(len(groupsPerTestCase)/2+1), 100, 1)
    print("\t\tClusters: " + str(optK))  
    kmeansClusterer = KMeansClusterer(optK, distance=cosine_distance, repeats=100, avoid_empty_clusters=True)
    print("\tclustering")
    assignedClusters = kmeansClusterer.cluster(data, assign_clusters=True)
            
    
    cnt = 0
    groupPerClusterPerTestcase[testCase] = {}
    for grp in sorted(usedGroups):
        if cnt < len(assignedClusters):
            assignedCluster = assignedClusters[cnt]
        else:
            assignedCluster = -9999
        if grp not in clusteringPerGroup:
            clusteringPerGroup[grp] = []
        if assignedCluster not in groupPerClusterPerTestcase[testCase]:
            groupPerClusterPerTestcase[testCase][assignedCluster] = []
        if grp in groupsPerTestCase:
            clusteringPerGroup[grp].append(assignedClusters[cnt])
            groupPerClusterPerTestcase[testCase][assignedCluster].append(grp)
            cnt += 1
        else:
            # insert -9999 as cluster to the groups that have not been found for that testcase
            clusteringPerGroup[grp].append(-9999)
    
        

print("Clustering per Group")
# Clustering the groups on the basis of the grouping for each testcase
        
# reformat the entries
for grp in clusteringPerGroup:
   clusteringPerGroupList.append(np.array(clusteringPerGroup[grp]))


print("\tfinding optimal K")
#optK = getOptK(data,round(len(groupsPerTestCase)/2+1), INFOTYPESCNT, 11)
#optK = findOptK(data, round(len(clusteringPerGroup)/2+1), 25, 1)
optK = findOptK(data, round(len(inputData)/2+1), 100, 1)
print("\t\tClusters: " + str(optK))  

kmeansClusterer = KMeansClusterer(optK, distance=cosine_distance, repeats=100, avoid_empty_clusters=True)
print("\tcluster")
assignedClusters = kmeansClusterer.cluster(clusteringPerGroupList, assign_clusters=True)

cnt = 0
groupPerClusterPerTestcase[OVERALL] = {}
for grp in sorted(usedGroups):
    if cnt < len(assignedClusters):
        assignedCluster = assignedClusters[cnt]
    else:
        assignedCluster = -9999
    if assignedCluster not in groupPerClusterPerTestcase[OVERALL]:
        groupPerClusterPerTestcase[OVERALL][assignedCluster] = []
    clusteringPerGroup[grp] = assignedCluster
    groupPerClusterPerTestcase[OVERALL][assignedClusters[cnt]].append(grp)
    cnt += 1

# Plot the data
pca = PCA(n_components = 2).fit(clusteringPerGroupList)
datapoint = pca.transform(clusteringPerGroupList)

plt.figure
##label1 = ["#FFFF00", "#008000", "#0000FF", "#800080", "#004004", "#400400", "#FF0FF0", "#F0FF0F", "#123456", "#FF00FF"]
##color = [label1[i] for i in assignedClusters]
plt.scatter(datapoint[:, 0], datapoint[:, 1])##, c=color)
for i, grp in enumerate(groupsPerTestCase):
    plt.annotate(str(grp), (datapoint[i, 0], datapoint[i, 1]))

plt.savefig('./clustering/simple-PCA_overall.png')
plt.clf()

print()
print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
print("+            Finished Clustering all Groups            +")
print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
print()

if not os.path.exists(CLUSTERINGPATH):
    os.makedirs(CLUSTERINGPATH)
            
# write clusters to file 
with open(CLUSTERINGPATH + "/simplePerGroup_new7.json", 'w') as f:
    json.dump(clusteringPerGroup, f, indent = 4)
 
with open(CLUSTERINGPATH + "/simplePerClusterPerTestCase_new8.json", 'w') as f:
    json.dump(groupPerClusterPerTestcase, f, indent = 4)

    
for testCase in groupPerClusterPerTestcase:
    with open(CLUSTERINGPATH + r"/perTestCase/simple-" + testCase + "_new8.json", 'w') as f:
        json.dump(groupPerClusterPerTestcase[testCase], f, indent = 4)
    

with open(CLUSTERINGPATH + "/simplePerClusterOverall_new8.json", 'w') as f:
    json.dump(groupPerClusterPerTestcase[OVERALL], f, indent = 4)    
    