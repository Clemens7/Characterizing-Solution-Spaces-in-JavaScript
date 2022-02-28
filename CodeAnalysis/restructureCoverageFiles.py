# filesystem
import os
# regex
import re
# copy
import shutil

JSCoveragePATH = r"./../GatheringJSCoverage/JSCoverage"

# original (folder-)structure:
#   groupNumber 
#       Testcategories (Checkout, Frame_Configurator, ...)
#           test-case_affected-file.js

# new (folder-)structure:
#   Testcategories 
#       test-case_affected-file_groupNumber.js

# https://pythonlearner.com/fast-copy-and-move-file-in-python/


for groupNumber in os.listdir(JSCoveragePATH):
    if(groupNumber != "perCategory" and groupNumber != "perTestCase"):
        for category in os.listdir(os.path.join(JSCoveragePATH, groupNumber)):
            # per Category (Checkout, Cart, ...)
            if not os.path.exists(os.path.join(JSCoveragePATH, "perCategory", category)):
                os.makedirs(os.path.join(JSCoveragePATH, "perCategory", category))
            for testCase in os.listdir(os.path.join(JSCoveragePATH, groupNumber, category)):
                oldPath = os.path.join(JSCoveragePATH, groupNumber, category, testCase)
                newFileName = re.sub(".js", '_' + groupNumber + '.js', testCase)
                newPathCat = os.path.join(JSCoveragePATH, "perCategory", category, newFileName)
                shutil.copy(oldPath, newPathCat)
                
                # per TestCase
                pureTestCaseName = testCase[0:testCase.index("_")]
                if not os.path.exists(os.path.join(JSCoveragePATH, "perTestCase", pureTestCaseName)):
                    os.makedirs(os.path.join(JSCoveragePATH, "perTestCase", pureTestCaseName))
                newPathCase = os.path.join(JSCoveragePATH, "perTestCase", pureTestCaseName, newFileName)
                shutil.copy(oldPath, newPathCase)
            






