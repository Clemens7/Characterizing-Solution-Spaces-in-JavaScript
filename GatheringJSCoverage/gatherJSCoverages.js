// fs-extra in order to be able to copy folders (with all of its content)
const fse = require("fs-extra");
const execSync = require('child_process').execSync;

const wwwPath = "./../www";
const testPath = "./test";

function getGroupNumbers(){
    const content = fse.readdirSync("./..");
    const groups = content.filter(name => name.match(/\d+/));
    let groupNumbers = new Array();

    groups.forEach(group => {
        groupNumbers.push(group.substring(group.indexOf("-")+1));
    });
    return groupNumbers;
}

function copyFolderForTests(groupNumber){
    if(fse.existsSync(wwwPath)){
        fse.rmdirSync(wwwPath, {recursive: true});
    }   
    fse.copySync(wwwPath + "-" + groupNumber, wwwPath);
}

function writeGroupNumber(groupNumber){
    fse.writeFileSync(wwwPath + "/groupNumber.txt", groupNumber);
}

function installNPMIntoTestFolder(){
    if(fse.existsSync(testPath)){
        process.chdir(testPath)
        if(!fse.existsSync("./node_modules")){
            // in order to see the output live
            // https://stackoverflow.com/questions/30134236/use-child-process-execsync-but-keep-output-in-console
            execSync("npm install", {stdio: 'inherit'});
        }
    } else{
        return -1;
    }
}

function runTestsForAllGroups(){


    if(installNPMIntoTestFolder() === -1){
        console.log("There is no Test-Folder, make sure to run 'injectData' before this file.");
        return;
    }

    const groupNumbers = getGroupNumbers();
  
    groupNumbers.forEach(group => {
        console.log("Running tests for group " + group);
        copyFolderForTests(group);
        writeGroupNumber(group);
        try{
            const result = execSync("npm run test");
            console.log(result);
        }
        catch (e){
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("Group " + group + " did not reach all Points");
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        }

        console.log("------------------------------------------");
    });
}


runTestsForAllGroups();