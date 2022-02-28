/**
 * This file uses the out.json file of ".nyc_output" to extract the used javascript of the files
 */
const PATHNAME = ".nyc_output";
const OUTPUTPATH = "../JSCoverage";
const fs = require("fs");
const jsHint = require("jshint").JSHINT;


let groupNumber;

/*
// DEPRICATED
function exportUsedJS (testCase)  {
    if(fs.existsSync(PATHNAME)){
        //const inputJSON = require("./" + PATHNAME + "/out.json");
        const inputJSON = fs.readFileSync("./" + PATHNAME + "/out.json", {encoding: "utf-8"});
        
        const inputData = JSON.parse(inputJSON);
        for(const jsFullFileName in inputData){
            let statementMap = inputData[jsFullFileName].statementMap;
            let statementBoolean = inputData[jsFullFileName].s;
            let fileName = jsFullFileName.slice(jsFullFileName.indexOf(PATHNAME)+12);
            let usedJS = "";
            let inputFile = fs.readFileSync("./" + PATHNAME + "/" + fileName, "utf-8");
            let inputFileAsStrings = inputFile.split("\n");
            for(const statement in statementMap){
                // Removing unused statements
                if(statementBoolean[statement] === 0)
                    delete inputData[jsFullFileName].statementMap[statement];
                else {
                    let endColumn = inputData[jsFullFileName].statementMap[statement].end.column;
                    
                    // ignore empty lines
                    if(!(endColumn === 0)){
                        usedJS += inputFileAsStrings[statement] + "\n";
                    }
                }
            }
            
            testCase = testCase.replace(new RegExp(" ", "g"), "_");
            if(!fs.existsSync("./" + OUTPUTPATH + "/")){
                fs.mkdirSync("./" + OUTPUTPATH + "/");
            }
            fs.writeFileSync("./" + OUTPUTPATH + "/"+ testCase + "-" + fileName, usedJS); 
                        
            //fs.rmdirSync("./" + PATHNAME, {recursive: true});
        }
        fs.unlinkSync("./" + PATHNAME + "/out.json");
        return;
    } else {
        console.log("There is no '.nyc_output' folder. Please run the tests first");
    }
}*/

module.exports = function extractUsedJS  (jsCoverage, testCase, category) {
    testCase = testCase.replace(new RegExp(" ", "g"), "-");
    category = category.replace(new RegExp(" ", "g"), "_");

    if(!groupNumber){
        groupNumber = getGroupNumber();
    }

    // coverage for each file
    for(const coverage of jsCoverage){
        let fileName = coverage.url.substring(coverage.url.lastIndexOf("/") + 1);
        if(fileName.includes("?")){
            fileName = fileName.substring(0, fileName.indexOf("?"));
        }
        if(!fileName.endsWith(".js")){
            fileName = fileName + ".js";
        }

        const ranges = coverage.ranges;
        let usedJS = "";
        let usedJSFixed = "";
        for(const range of ranges){
            usedJS += coverage.text.substring(range.start, range.end) //+ "\r\n//New Block:\r\n";
        }/*
         if(fileName === "config.js"){
             const options = {
                // https://jshint.com/docs/options/
                // use {} everytime
                curly: true,
                // no ==, != --> ===, !==
                eqeqeq: true,
                // ECMAScript version 8 (let, const is in 6, async is in 8)
                esversion: 8,
                // no overwriting of prototypefunctions
                freeze: true,
                // warnings for identifiers which will be defined in future JS-Versions 
                futurehostile: true,
                // no usage of variables before they are defined
                latedef: true,
                // no unnecessary cases in switch  
                leanswitch: true,
                // max Errcount before JSHint gives up
                maxerr: 9999,
                // no "non-breaking whitespaces" --> could break non-UTF8 pages
                nonbsp: true,
                // warns when variables are defined but unused
                unused: true,
                // no "var", only "let" and "const"
                varstmt: true
             };
             jsHint(usedJS, { esversion: 8, maxerr: 9999});
             usedJSFixed = fixJS(usedJS, jsHint.errors);

         }*/

        if(!fs.existsSync("./" + OUTPUTPATH + "/")){
            fs.mkdirSync("./" + OUTPUTPATH + "/");
        }
        // creating folder for the group
        if(!fs.existsSync("./" + OUTPUTPATH + "/" + groupNumber)){
            fs.mkdirSync("./" + OUTPUTPATH + "/" + groupNumber);
        }

        // creating a subfolder for each testgroup
        if(!fs.existsSync("./" + OUTPUTPATH + "/" + groupNumber + "/" + category)) {
            fs.mkdirSync("./" + OUTPUTPATH + "/" + groupNumber + "/" + category);
        }

        fs.writeFileSync("./" + OUTPUTPATH + "/" + groupNumber + "/" + category + "/"
                         + testCase + "_" + fileName, usedJS); 

        //fs.writeFileSync("./" + OUTPUTPATH + "/" + category + "/FIXED-"
        //                + testCase + "_" + fileName, usedJSFixed); 
    }
}

function getGroupNumber(){
    groupNumber = fs.readFileSync("./../www/groupNumber.txt", "utf-8");
    return groupNumber;
}

function fixJS(usedJS, errors){
    let usedJSFixed = usedJS.split("\r\n");

    for (const err of errors) {
        // comment statements like: "let xyz = ;"
        if(err.reason === "Expected an identifier and instead saw ';'."){
            //usedJSFixed.splice(err.line-1,1);
            //usedJSFixed[err.line - 1] = "//" + usedJSFixed[err.line - 1];
        let tmpFix = usedJSFixed[err.line - 1];
        let semicolonIndex = tmpFix.indexOf(";");
        tmpFix = tmpFix.substring(0, semicolonIndex - 1) + " undefined;"; 
	    usedJSFixed[err.line - 1] = tmpFix;
        }
        // // adding missing semicolons, e.g.:  "if(x==y) else..."
        // if(err.reason === "Missing semicolon."){
        //     usedJSFixed[err.line - 1] += ";";
        // }
        // // close brackets
        // // using raw here to have 1 template for all types of brackets
        // if(err.raw === "Unmatched '{a}'."){
        //     console.log(usedJSFixed[err.line - 1]);
        // }
    }
    // removing statements that beginn with a comment 
    // (--> from step before, where statements like "let xyz = ;" get commented)
    
    // for (let i = 0; i < usedJSFixed.length; i++) {
    //     if(usedJSFixed[i].startsWith("//")){
    //         usedJSFixed.splice(i, 1);
    //     }
    // }
    usedJSFixed = usedJSFixed.join("\r\n");
    return usedJSFixed;
}
