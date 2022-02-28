import numpy as np
import statsmodels.api as sm # used for LOWESS-function
import sys

from nltk.cluster import KMeansClusterer, cosine_distance
from sklearn.cluster import KMeans, MeanShift, estimate_bandwidth, MiniBatchKMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

from scipy.cluster.hierarchy import dendrogram, linkage
from scipy.spatial.distance import pdist


lowess = sm.nonparametric.lowess

def nltkInertia(data, assigned, centroids, dictLen, exclude = -1):
    sum_ = []
    for i in range(len(data)):
        for j in range(dictLen):
            if j != exclude:
            
                sum_.append(np.sum((data[i][j] - centroids[assigned[i]][j])**2))
        
    return sum(sum_)
    

# find the optimal amount of clusters - k adapted from:
# https://www.youtube.com/watch?v=IEBsrUQ4eMc  
def getOptK(data, maxK, dictLen, clusteringRepeats = 10, exclude = -1):
    distanceToCenter = []
    if maxK > len(data):
        maxK = len(data)-1
    k = range(2,maxK, 1)
    for cluster in k:
        kModel = KMeansClusterer(cluster, distance=cosine_distance, repeats=clusteringRepeats, avoid_empty_clusters=True)
        assigned = kModel.cluster(data, assign_clusters=True)
        distanceToCenter.append(nltkInertia(data, assigned, kModel.means(), dictLen, exclude))
        
    # y = ax + b
    a = (distanceToCenter[len(k)-1] - distanceToCenter[0]) / (len(k) - 1)
    a1 = distanceToCenter[0] - distanceToCenter[len(k) - 1]
    b = distanceToCenter[0]
    distanceToLine = []
    index = 0
  
    for cluster in k:
        print ("\t\t\tindex: ", index)
        print("\t\t\tdistance to center: ", distanceToCenter[index]) 
        distanceToLine.append(((index) * a + b) - distanceToCenter[index])
        print("\t\t\tdistance to line: ", distanceToLine[index])
        #print("\t\t\tcalc distance: ", calc_distance 
        index += 1
    
    print("\tdistances to center: ", distanceToCenter)
    maxDistance = -999
    optK = -1
    for index, distance in enumerate(distanceToLine):
        if maxDistance < distance:
            maxDistance = distance
            optK = index + 1
            
    return optK
   
  
def calc_distance(x1, y1, a, b, c):
    d = abs((a * x1 + b * y1 + c)) / (math.sqrt(a * a + b * b))
    return d
    

import pandas as pd

def findOptK(data, maxK, clusteringRepeats = 10, steps = 2, noOfExecution = 0):
    
    #print(data)
    #with open(r"./data.txt", 'a') as f:
  
    
    
    #df = pd.DataFrame(data.toarray())
    #df.to_csv("data.csv", index=False, header=False)
    
    #axis = plt.axes(projection='3d')
    #xs, ys = np.nonzero(data)
    #xs = np.unique(xs)
    #ys = np.unique(ys)
    #print(df.iloc[:,0])
    #for x in xs:
    #    for y in ys:
    #        z = data[x,y]
    #        if z != 0:
    #            axis.scatter(x,y,z)
    #    if x%100 == 0 :
    #        print(x)
    #df.plot.scatter(x = 'samples', y = 'features', z = 'tfidf')
    #plt.savefig("./scatter_data.png")
    
    
    #dend = shc.dendrogram(shc.linkage(data, method='ward'))
    """
    #set maximum recursion amount high enough for denrogram()
    sys.setrecursionlimit(100000)
    
    X = df.head(1).T.values #Transpose values 
    Y = pdist(X)
    Z = linkage(Y)
    dend = dendrogram(linkage(data))
    #dend = dendrogram(linkage(Y, method='ward'), labels = df.columns)
    #dend = dendrogram(linkage(df.head(100), method='ward'))
    plt.plot(dend)
    plt.savefig("./dendogram.png")
    """
    
    """
    X = data.todense()
    pca = PCA().fit(X)
    data2D = pca.transform(X)
    #plt.scatter(data2D[:,  0],   data2D[:,  1],   data2D[:,  3])
    #plt.show()
    #print(data2D)
    data = data2D
    """
   
    
    
    
    distanceToCenter = []
    #if maxK > len(data):
    #    maxK = len(data)-1
    score = []
    print("\nDISTANCE TO CENTER: MaxK = " + str(maxK) + "\n")
    k = range(2,maxK-1, steps)
    for cluster in k:
        sklearnKMeans = KMeans(n_clusters = cluster, n_init = clusteringRepeats, max_iter = 15000, algorithm = "full", verbose = 0)
        sklearnKMeans.fit(data)
        distanceToCenter.append(sklearnKMeans.inertia_)
        ###print("\t\t\t" + str(cluster) + "\t" + str(sklearnKMeans.inertia_))
    
    #if noOfExecution == 1:
    #    distanceToCenter = [11072.17996, 10596.60285, 10429.68753, 10235.72335, 10109.23563, 9986.636188, 9762.372452, 9540.841886, 9268.162196, 9186.207972, 9110.469008, 9135.538539, 8917.578043, 8779.921083, 8637.148172, 8435.174561, 8483.712718, 8416.201359, 8298.112847, 8127.321162, 8066.991215, 7949.546604, 7762.060919, 7793.993443, 7550.564581, 7630.257173, 7545.184472, 7475.445593, 7471.272546, 7295.516622, 7387.951424, 7249.99597, 7231.420395, 7127.199568, 6975.597508, 6985.572845, 6941.111948, 6875.485474, 6842.339367, 6774.763091, 6752.57738, 6683.073337, 6646.5496, 6640.370357, 6574.893374, 6503.80033, 6388.567236, 6401.978663, 6239.948946, 6371.890054, 6369.317372, 6199.300255, 6245.793574, 6259.29296, 6142.528523, 6082.754431, 6120.442882, 6115.063202, 6026.380317, 6044.222069, 6011.723913, 5989.658471, 5932.924674, 5932.928929, 5898.692928, 5835.963455, 5833.623834, 5844.445576, 5842.579829, 5779.482813, 5770.698572, 5746.044982, 5786.385282, 5727.94, 5715.90502, 5624.645202, 5634.939798, 5638.094732, 5655.490583, 5628.370608, 5596.842089, 5588.135808, 5554.845861, 5564.873685, 5537.123471, 5493.519018, 5556.053499, 5540.882745, 5460.725447, 5486.304164, 5447.474212, 5441.246445, 5446.684676, 5398.578575, 5395.722692, 5431.648901, 5387.185718, 5376.969692, 5342.106433, 5343.660283, 5355.635114, 5344.352999, 5297.55162, 5274.315186, 5287.105982, 5286.517257, 5260.568968, 5238.083015, 5206.765074]
    #if noOfExecution == 2:
    #    distanceToCenter = [11072.17996, 10592.25909, 10199.25949, 9971.358674, 9829.904603, 9932.53907, 9713.141659, 9441.768267, 9294.528033, 9139.754907, 8980.944472, 8853.319887, 8802.968372, 8687.393283, 8516.912699, 8500.178545, 8361.185685, 8207.503711, 8200.430566, 8123.047838, 7949.375295, 7837.163511, 7821.120935, 7702.373641, 7589.313985, 7574.926282, 7482.41428, 7337.198405, 7317.896901, 7274.915628, 7202.586134, 7139.295973, 7056.277768, 7044.703124, 6937.354412, 6948.323615, 6901.058496, 6756.569074, 6745.329349, 6697.14354, 6691.125686, 6588.847266, 6609.104719, 6548.392047, 6499.724213, 6508.541016, 6398.170258, 6350.367521, 6283.509976, 6313.230703, 6280.097004, 6187.191539, 6122.709174, 6136.653886, 6134.555081, 6028.979873, 6060.536856, 5995.38337, 6010.757549, 6009.019039, 5943.092761, 5931.619697, 5878.440545, 5841.618277, 5858.849462, 5830.445235, 5842.831911, 5823.572996, 5808.687939, 5799.846471, 5733.676537, 5742.534826, 5694.157973, 5721.199132, 5651.846923, 5657.645553, 5598.94711, 5589.696301, 5629.665483, 5558.245567, 5577.679404, 5550.321163, 5548.26342, 5493.071044, 5472.815629, 5486.936067, 5492.879746,  5454.556639,  5442.120649,  5422.268737,  5431.658711,  5395.380747,  5384.430412,  5355.848104,  5373.319267,  5356.945209,  5304.936748,  5341.647831,  5308.178303,  5305.817913,  5312.634191,  5283.045254,  5280.819013,  5257.09918,  5285.105515,  5251.591652,  5229.788964,  5205.834509,  5205.772659]
    #if noOfExecution == 3:
    #    distanceToCenter = [11072.17996, 10592.25909, 10190.9816, 10078.23816, 9851.159572, 9807.968031, 9681.143318, 9398.410058, 9263.05829, 9118.452073, 9069.530611, 8950.338128, 8726.458566, 8685.351401, 8599.887153, 8483.537109, 8395.146816, 8252.809398, 8145.921182, 8081.132626, 7954.766717, 7936.83353, 7752.470275, 7713.164852, 7685.002463, 7559.251879, 7483.2158, 7393.437652, 7329.102849, 7242.07478, 7161.438368, 7166.265432, 7074.624134, 7047.069019, 6990.409926, 6886.507843, 6873.736485, 6851.665367, 6724.043846, 6671.60577, 6659.89166, 6632.459181, 6586.498827, 6527.788635, 6466.98938, 6384.611291, 6393.53515, 6301.199643, 6342.44247, 6326.533648, 6255.183144, 6268.219298, 6139.999769, 6190.055776, 6075.389193, 6072.905184, 6064.532195, 6034.522508, 5985.484369, 5988.768705, 5942.276892, 5920.206862, 5895.21742, 5890.324412, 5851.937827, 5877.059121, 5835.549187, 5805.653918, 5793.75077, 5760.289528, 5754.074951, 5712.46122, 5671.006678, 5712.048081, 5684.787316, 5654.24137, 5629.516777, 5611.664219, 5606.141787, 5623.297867, 5595.387463, 5539.607085, 5575.978441, 5505.241802, 5518.687298, 5483.399688, 5490.321853, 5477.458721, 5449.660838, 5449.2471, 5442.537736, 5415.207496, 5401.816289, 5384.243406, 5350.709691, 5355.483932, 5320.652349, 5335.183208, 5315.410776, 5287.950339, 5291.157898, 5293.330541, 5280.104288, 5246.109937, 5272.65848, 5209.396386, 5236.026138, 5225.179883, 5203.007525]
    #Using LOWESS-function to interpolate the data points in order to get consistent results
    #y_hat = lowess(k,  distanceToCenter)
    
    #distanceToCenter = [107.4872975803612, 74.13318537289597, 62.737432347614515, 56.50469414465006, 53.76796918905436, 51.56476591991558, 49.83014766284751, 49.61229444620395, 47.48401234737982, 46.41502292275024, 45.79185439461258, 45.57157532324745, 45.31893388411558, 44.53446039921548, 44.07007970054826, 43.41344585187274, 43.1670505153164, 42.688062869802145, 42.22055036188368, 41.92825555504573, 41.79791220298438, 41.349264059495134, 40.855358415934724, 40.94650063158338, 39.712329036149754, 39.65324805059564, 39.51921608615335, 39.065813699357975, 38.97269388644604, 38.83639106352225, 38.43678420672178, 38.04560202633579, 37.83376982572282, 37.34011459564721, 37.38145913225088, 37.05654075306566, 36.57806232609515, 36.58717049137917, 36.43194229243735, 35.98350074250473, 35.90911863565029, 35.521232424936066, 34.867810088778775, 35.038636205602664, 34.89229869663971, 34.3970353925025, 34.28825518687237, 34.00342270546694, 33.42161434887837, 33.47906488465586, 33.327841695182, 32.654890447955445, 32.73645068395417, 32.497173399645554, 32.09141436003408, 31.81772010640919, 31.863887373100287, 31.5365852477374, 31.301866684378066, 31.20592804680677, 30.650369565294064, 30.632849424789832, 30.668631540755765, 30.11764752549604, 29.952687364132352, 29.654510417234675, 29.72033266925141, 29.108793854784615, 29.301277053770107, 28.98778035011373, 28.74011138359338, 28.488324605665504, 28.273078513590775, 28.182182716358586, 28.144040630881406, 27.666161794574247, 27.444502374178914, 27.365259297856834, 27.29791353672154, 27.060087823614886, 26.533675494161418, 26.666969527174572, 26.5150012934087, 26.27903459289591, 26.105401761822904, 25.932396039273165, 25.906396791633405, 25.52094899501963, 25.357233685161262, 25.314449686541586, 25.19146124480603, 24.67723805013399, 24.821586478389904, 24.635285457371097, 24.361405950259172, 24.294950157387905, 24.143225549147022, 24.11174216532666, 23.946217115471047, 23.619470343503085, 23.351930762328355, 23.160367887091876, 22.95486691573157, 23.089703062120563, 22.760184362191513, 22.42691578804981, 22.51279613844547, 22.425609699187888, 22.293463392604043, 22.123653925533553]
    #distanceToCenter = [107.4872975803612, 74.13318537289597, 62.737432347614515, 56.50469414465006, 53.89986029151191, 51.56476591991558, 51.14234621863363, 48.74517033303159, 48.285266426897586, 46.40401020525537, 46.00747604121981, 44.77514722274123, 45.10926871051579, 44.51795159103537, 43.87537400247298, 43.974900782962045, 43.458039415221705, 42.29612002986769, 42.51067562518198, 41.818185955311016, 41.46544155069356, 41.33928141315766, 40.96885804083844, 40.53123471994411, 40.09753383025908, 39.63894316127131, 39.59979261242029, 39.54123359964761, 38.963798525422796, 38.90320058872314, 38.17384643950639, 38.28639554802719, 38.21618978389608, 37.77945647123722, 37.344701540907046, 36.96809385388301, 36.5545732908838, 36.42877221696745, 36.31991620456256, 36.23965429645011, 35.820701481236114, 35.01934531487812, 35.088755678361196, 34.95433322370541, 34.720403803547455, 34.414433285745126, 34.319255103306844, 34.01521725886025, 33.98124733146619, 33.7562644811996, 33.4337124072116, 33.01593036110873, 32.89520911253715, 32.58822482371692, 32.23527288945774, 32.096565757662454, 31.585989763440704, 31.39871334003659, 31.04941955163341, 30.885705284627903, 30.640692693286468, 30.582949884325565, 30.540104801445448, 30.23240061621029, 30.021462232896106, 29.51619935427004, 29.72187907569408, 29.291207266694023, 28.93653522465487, 29.05320920798044, 28.72117844277004, 28.39855855235596, 28.506283773493205, 28.162953373152583, 27.944061417496368, 27.61567772718031, 27.710767268290628, 27.463807492914334, 27.383111594364287, 27.10896300462897, 26.991388097195436, 26.62050171206397, 26.21705522256502, 26.27806165533804, 25.994286072612763, 25.866009984300447, 25.760117471555827, 25.6267993143341, 25.428382424463216, 25.381417559068538, 24.927850185165816, 24.864229288342557, 24.669211909743275, 24.602873751775522, 24.160382351408884, 24.104616454232687, 24.230757661063453, 24.11148167274194, 23.78043120968199, 23.592185326184055, 23.444869925261848, 23.385774219913866, 23.018594861708188, 22.806441945248, 22.732235868753754, 22.574202828213323, 22.69963103078438, 22.27087514858278, 22.43979070484238, 22.10244304229137]
    y_hat = lowess(distanceToCenter,   k,   0.1)
    
    with open('./distanceToCenter_normal.txt', 'a') as f:
        f.write(str(clusteringRepeats) + "\t" + str(noOfExecution) + "\n" + str(distanceToCenter) + "\n\n")
    # y = ax + b
    a = (distanceToCenter[len(k) - 1] - distanceToCenter[0]) / (len(k) - 1)
    a_hat = (y_hat[len(k) - 1,  1] - y_hat[0,  1]) / (len(k) - 1)
    b = distanceToCenter[0]
    b_hat = y_hat[0,  1]
    distanceToLine = []
    distanceToLine_hat = []
    distance = 0
    distance_hat = 0
    index = 0
    
    
    print("\n\nDISTANCE TO LINE:\n")
    for cluster in k:
        distance = (index * a + b) - distanceToCenter[index]
        distance_hat = (index * a_hat + b_hat) - y_hat[index,  1]
        #distanceToLine.append(((cluster) * a + b) - distanceToCenter[cluster - 1])
        distanceToLine.append(distance)
        distanceToLine_hat.append(distance_hat)
        #print("\t\t\t" + str(index) + "\t" + str(distance))
        ###print("\t\t\t" + str(index) + "\t" + str(distance_hat))
        index += 1 

    maxDistance = -999
    optK = -1
    for index,   distance in enumerate(distanceToLine):
        if maxDistance < distance:
            maxDistance = distance
            optK = index + 1
    print("Opt-K Normal:\t" + str(optK))
    
   
    #for index,   distance in enumerate(distanceToLine_hat):
    #    if maxDistance < distance:
    #        maxDistance = distance
    #        optK = index + 1
    #print("Opt-K:\t\t" + str(optK))
    
    
    plt.clf()
    
    plt.plot(distanceToCenter)
    plt.plot(distanceToLine)
    #plt.plot(distanceToLine_hat)
    #plt.plot(y_hat[:,1])
    #plt.legend()
    plt.title("Clustering repeats: " + str(clusteringRepeats) + " - Clusters:" + str(optK))
    
    plt.savefig("./clustering_repeats/" + str(clusteringRepeats) + "_" + str(noOfExecution) + "-" + str(optK) + ".png")
    plt.clf()
    return optK
    
 
def findOptKSilhouette(data,   maxK,   clusteringRepeats = 10,   steps = 2):
    
    silhouette = []
    score = 0
    
    print("CLUSTERING WITH SILHOUTTE")
    for k in range(2,   maxK,   steps):
        sklearnKMeans = KMeans(n_clusters = k,   n_init = clusteringRepeats)
        sklearnKMeans.fit(data)
        labels  = sklearnKMeans.labels_
        score = silhouette_score(data,   labels,   metric = 'cosine')
        silhouette.append(score)
        print("\t\t\t" + str(k) + "\t" + str(score))
    
    maxScore = -999
    optK = -1
    for index,   sil_score in enumerate(silhouette):
        #print("\t\t\t" + str(index) + "\t" + str(sil_score))
        if maxScore < sil_score:
            maxScore = sil_score
            optK = index + 1
    plt.clf()
    plt.plot(silhouette)
    plt.savefig("./clustering_repeats/silhoutte_" + str(maxK) + "-" + str(optK) + ".png")
            
    return optK
    
    
    
#https://towardsdatascience.com/selecting-optimal-k-for-k-means-clustering-c7579fd2e926  
#https://scikit-learn.org/stable/modules/generated/sklearn.cluster.MeanShift.html
def findOptKMeanShift(data):
    
    #dataArray = data.todense()
    dataArray = data
    sklearnMeanShift = MeanShift(dataArray,   n_jobs = -1)
    
    sklearnMeanShift.fit(dataArray)
    labels = sklearnMeanShift.labels_
    cluster_centers = sklearnMeanShift.cluster_centers_
    
    labels_unique = np.unique(labels)
    
    return len(labels_unique)
    
    
def findOptKMiniBatch(data,   maxK,   clusteringRepeats = 10,   steps = 1,   noOfExecution = 0):
    distanceToCenter = []
    #if maxK > len(data):
    #    maxK = len(data)-1
        
    """
    X = data.todense()
    pca = PCA().fit(X)
    data2D = pca.transform(X)
    plt.scatter(data2D[:,  0],   data2D[:,  1],   data2D[:,  3])
    plt.show()
    """
    
    print("\nDISTANCE TO CENTER: MaxK = " + str(maxK) + "\n")
    k = range(2,  maxK,   steps)
    for cluster in k:
        sklearnKMeans = MiniBatchKMeans(n_clusters = cluster,   n_init = clusteringRepeats,   batch_size = 3072, max_no_improvement = None, reassignment_ratio = 0)
        sklearnKMeans.fit(data)
        distanceToCenter.append(sklearnKMeans.inertia_)
        print("\t\t\t" + str(cluster) + "\t" + str(sklearnKMeans.inertia_))
        
    
    
    with open('./distanceToCenter_minibatch.txt', 'a') as f:
        f.write(str(clusteringRepeats) + "\t" + str(noOfExecution) + "\n" + str(distanceToCenter) + "\n\n")
    
    #for frac in [x / 100.0 for x in range(1, 100, 1)]:
    
    #    y_hat = lowess(distanceToCenter, k, frac)
    #    plt.clf()
    #    plt.plot(distanceToCenter)
    #    plt.plot(y_hat)
    #    plt.title("Fraction: " + str(frac))
    
    #    plt.savefig("./clustering_repeats/" + str(frac) + ".png")
    #print(xyz)
    
    for frac in range(1,3,1):
        if frac == 1:
            y_hat = lowess(distanceToCenter, k, 0.15)
        if frac == 2:
            y_hat = lowess(distanceToCenter, k, 0.2)
            
        # y = ax + b
        #a = (distanceToCenter[len(k) - 1] - distanceToCenter[0]) / (len(k) - 1)
        a = (y_hat[len(k) - 1,  1] - y_hat[0,  1]) / (len(k) - 1)
        #b = distanceToCenter[0]
        b = y_hat[0,  1]
        distanceToLine = []
        distance = 0
        index = 0
        #print("\n\nDISTANCE TO LINE:\n")
        for cluster in k:
            distance = (index * a + b) - y_hat[index,  1]
            #distanceToLine.append(((cluster) * a + b) - distanceToCenter[cluster - 1])
            distanceToLine.append(distance)
            #print("\t\t\t" + str(index) + "\t" + str(distance))
            index += 1 
        
        maxDistance = -999
        optK = -1
        for index,   distance in enumerate(distanceToLine):
            if maxDistance < distance:
                maxDistance = distance
                optK = index + 1
       
        #[distance,   optK] = max(distanceToLine)
        
        plt.clf()
        
        plt.plot(distanceToCenter)
        plt.plot(distanceToLine)
        plt.plot(y_hat)
        plt.title("Clustering repeats: " + str(clusteringRepeats) + "__" + str(frac) + "__ - Clusters:" + str(optK))
        
        plt.savefig("./clustering_repeats/" + str(clusteringRepeats) + "_" + str(noOfExecution) + "__" + str(frac) + "__-" + str(optK) + ".png")
    
    return optK   

