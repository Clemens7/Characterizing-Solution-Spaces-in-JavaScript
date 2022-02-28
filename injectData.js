//const fs = require("fs");
const fse = require("fs-extra");
const exec = require('child_process').exec;
const PATH = process.cwd().replace(new RegExp("\\\\","g"), "/") + "/repos/a2-group-";
const COLLECTIONPATH = process.cwd().replace(new RegExp("\\\\","g"), "/") + "/GatheringJSCoverage";

const REPOCOUNT = 250;

//Precondition: there exists a file package.json, which already has devDependencies 
function injectIntoPackageJsonFile(groupNumber){
    const inputJson = fse.readFileSync(PATH + groupNumber + "/test/package.json", {encoding: "utf-8"});
    const data = JSON.parse(inputJson);

    // Adding JSHint devependency
    data["devDependencies"].jshint = "^2.12.0"; 

    // Adding "./jest.setup.js" to be executed after Env
    if(!data.jest.setupFilesAfterEnv){
        data.jest.setupFilesAfterEnv = new Array("./jest.setup.js");
    }
    else if(!data.jest.setupFilesAfterEnv.includes("./jest.setup.js")){
        data.jest.setupFilesAfterEnv.push("./jest.setup.js");
    }

    
    const outputData = JSON.stringify(data, null, "\t");

    fse.writeFileSync(PATH + groupNumber + "/test/package.json", outputData);
    console.log("Successfully injected into package.json: " + groupNumber);
}

//Precondition: Test files have to have the ending: .test.js 
//              and the only 'import' statements should be at top, for a cleaner look
//              and files must have a '// Coverage"' in it (not case-sensitive as it gets converted to lowercase)
//              and it has to be after the original 'beforeEach()'!
function injectIntoTests(groupNumber, optionsINI){
    const folderContent = fse.readdirSync(PATH + groupNumber + "/test/");
    const testFileNames = folderContent.filter(name => name.includes(".test.js"));
    
    for (const fileName of testFileNames) {
        const input = fse.readFileSync(PATH + groupNumber + "/test/" + fileName, {encoding: "utf-8"});
        const testCaseGroup = fileName.substring(0, fileName.indexOf(".test.js"));
        const statements = input.split("\r\n");

        // Inserting function import


        // Inserting beforeEach() and afterEach()
        const toInsert = [
            "    beforeEach(async () => {",
            "        await page.coverage.startJSCoverage();",
            "    });",
            "",
            "    afterEach(async () => {",
            "        const jsCoverage = await page.coverage.stopJSCoverage();",
            "",
            "        const currentTest = jasmine[\"currentTest\"];",
            "        const category = currentTest.fullName.substring(0, ",
            "                          currentTest.fullName.indexOf(currentTest.description))",
            "                           .trim();",
            "        extractUsedJS(jsCoverage, jasmine[\"currentTest\"].description, category);",
            "    });",
            ""
        ];
        let indexesWhereToInsertBeforeEachAndAfterEach = new Array();
        let indexesWhereToInsertFunctionImport = new Array();
        for (let i = 0; i < statements.length; i++) {
            if(statements[i].toLocaleLowerCase().match("// coverage")){
                indexesWhereToInsertBeforeEachAndAfterEach.push(i);
            }
            if(statements[i].match("import")){
                indexesWhereToInsertFunctionImport.push(i);
            }
        }
        // sorting in desc ordering, otherwise there would be index problems, while inserting
        // if '// coverage' exists in the files use it, otherwise go insert the code at the specified line from the INI file
        if(indexesWhereToInsertBeforeEachAndAfterEach.length > 0){
            indexesWhereToInsertBeforeEachAndAfterEach.sort((a,b) => b - a);
            for (let i = 0; i < indexesWhereToInsertBeforeEachAndAfterEach.length; i++) {
                statements.splice(indexesWhereToInsertBeforeEachAndAfterEach[i], 1, ...toInsert);
            }
        } else {
            statements.splice(optionsINI[testCaseGroup+"Line"],0, ...toInsert);
        }
        
        indexesWhereToInsertFunctionImport.sort((a,b) => b - a);
        statements.splice(indexesWhereToInsertFunctionImport[0] + 1, 0, 
            "const extractUsedJS = require('./getUsedJS');");
        fse.writeFileSync(PATH + groupNumber + "/test/" + fileName, statements.join("\r\n"));
        console.log("Successfully injected into Test-File: " + fileName + ": " + groupNumber);
    }
} 

// adapted from https://gist.github.com/anonymous/dad852cde5df545ed81f1bc334ea6f72
// PRECONDITION: there must exist a file "codeLines.INI" under "./util/" and it has to be built in following way:
//               <testCase>Line=XX --> e.g. cartLine=47
function parseINI() {
    const regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };

    let value = {};
    if(!fse.existsSync("./util/codeLines.INI")){
        console.log("INI File with the Linenumbers where the code will be inserted does not exist.")
    }

    const inputData = fse.readFileSync("./util/codeLines.INI", "utf-8");
    const lines = inputData.split("\r\n");
    lines.forEach( line => {

        if(regex.comment.test(line)){
            return;
        } else if(regex.param.test(line)) {
            const statements = line.split("=");
            if(statements.length != 2){
                console.log("Error in the INI File");
                return;
            }
            value[statements[0].trim()] = statements[1].trim();
        } else if(regex.section.test(line)){
            // if sections are needed check out the link above the function
        }
    });

    return value;
}

function copyFiles(groupNumber){
    const folderContent = fse.readdirSync("./util");
    const fileNames = folderContent.filter(name => name.includes(".js"));

    for (const fileName of fileNames) {
        const input = fse.readFileSync("./util/" + fileName);
        fse.writeFileSync(PATH + groupNumber + "/test/" + fileName, input);
        console.log("Successfully copied: " + fileName + ": " + groupNumber);
    }
}


function copyGroupImplementation(groupNumber) {
    try {
        if(!fse.existsSync(COLLECTIONPATH)){
            fse.mkdir(COLLECTIONPATH);
        }

        fse.copySync(PATH + groupNumber + "/www", COLLECTIONPATH + "/www-" + groupNumber);

        console.log("Successfully copied implementation (www-folder): " + groupNumber);
    } catch(err) {
        console.error(err);
    }
}

function copyOneTestFolder(groupNumber){
    if(!fse.existsSync(COLLECTIONPATH + "/test")){
        fse.copySync(PATH + groupNumber + "/test", COLLECTIONPATH + "/test");
    }
}

function cloneRepos() {
    // first 2 arguments are the path to node and to this file
    let groupNumbers = process.argv.slice(2);

    // if(groupNumbers.length > 0){

    //     const optionsINI = parseINI();       
    
    //     if(!optionsINI){
    //         return;
    //     }

    //    groupNumbers.forEach(number => {
    //        const url = "https://github.com/web-engineering-tuwien/a2-group-" + number + ".git";
        
    //        if(!fse.existsSync("./repos/a2-group-" + number)){
    //         console.log("---------------------------------------------------");
    //         console.log("Cloning Repo of group: " + number);
    //         exec("git clone " + url + " repos/a2-group-" + number, (err, stdout, stderr) => {
    //                 if(err){
    //                     console.log("An error occured " + err);
    //                 } else { 
    //                     console.log("Successfully cloned the repository.\nStarting to inject and copy files");
    //                     injectIntoPackageJsonFile(number);
    //                     injectIntoTests(number,optionsINI);
    //                     copyFiles(number);
    //                     copyGroupImplementation(number);
    //                     copyOneTestFolder(number);
    //                     console.log("---------------------------------------------------");
    //                     console.log("Finished");
    //                 }
    //             });
    //         } else {
    //             console.log("Repo of group '" + number +"' already cloned!");
    //         }
    //    });
    // } else {
    //     console.log("No groupnumbers passed! Cloning every eeposoitory found (0-" + REPOCOUNT + ")");

    // }

    if(groupNumbers.length <= 0) {
        console.log("No groupnumbers passed! Cloning every eeposoitory found (0-" + REPOCOUNT + ")");
        groupNumbers = Array.from({length: REPOCOUNT}, (_, i) => i + 1);
    }

    const optionsINI = parseINI();       
    
    if(!optionsINI){
        return;
    }

    groupNumbers.forEach(number => {
        const url = "https://github.com/web-engineering-tuwien/a2-group-" + number + ".git";
    
        if(!fse.existsSync("./repos/a2-group-" + number)){
        console.log("---------------------------------------------------");
        console.log("Cloning Repo of group: " + number);
        exec("git clone " + url + " repos/a2-group-" + number, (err, stdout, stderr) => {
                if(err){
                    console.log("An error occured " + err);
                } else { 
                    console.log("Successfully cloned the repository.\nStarting to inject and copy files");
                    injectIntoPackageJsonFile(number);
                    injectIntoTests(number,optionsINI);
                    copyFiles(number);
                    copyGroupImplementation(number);
                    copyOneTestFolder(number);
                    console.log("---------------------------------------------------");
                    console.log("Finished: " + groupNumbers);
                }
            });
        } else {
            console.log("Repo of group '" + number +"' already cloned!");
        }
    });

}




cloneRepos();
