# Bachelor thesis - Characterizing Solution Spaces in JavaScript

## The overall structure of the elements is as follows:
- injectData.js: 
  This will clone the repositories of the groups and preparing the basic test setup, like one overall test folder or copying the needed files.
- /util folder: 
  contains important information: the needed code for getting the coverage, information on where it needs to be inserted into the test cases.
  - codeLines.INI: 
    this file contains information where the code needs to be pasted into the testcases.
  - getUsedJS.js: 
    this is copied into the test structure and then used there.
  - jest.setup.js: 
    this file is needed to get the name of the tests and is copied into the test structure as well.
- /GatheringJSCoverage folder: 
  has the gathered solutions code and the script to obtain it.
  - /JSCoverage folder:
    contains the executed code for the groups.
  - /test folder:
    this is the test structure folder.
  - /www folder: 
    this folder contains the solution of the group which is tested at the moment.
  - gatherJSCoverage.js: 
    This script copies each implementation folder of the groups into the www folder and then executes the test cases for this solution.
- /CodeAnalysis folder:
  contains everything for the code anaylsis.
  - /clustering folder: 
    has the clustering results in it after running the scripts.
  - /clustering_repeats folder:
    has the clustering results in it, which are produced by the util.py script.
  - /data folder: 
    contains the data for each TestCase for each Group in it.
  - /results folder: 
    contains images of results of the vector spaces and clustering.
  - basicAnalysis.py:
    This script is for doing the basic anaylsis.
  - complexAnalysis.py:
    This script executes the complex analysis with Doc2Vec.
  - prepareDataForBasicAnalysis.js: 
    as the name suggests, this prepares the data for the basic analysis. It counts the if, for, while, ..., lines of code, affected files and also the JSHint messages.
  - restructureCoverageFiles.py: 
    restrucutes the gathered JavaScript code of the different groups divided per group and per testcase (which is needed for the analysis).
  - util.py: 
    contains utility functions like obtaining the right number of clusters for given input.
