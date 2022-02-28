const fs = require("fs");
const jsHint = require("jshint").JSHINT;

const JSCoveragePATH = "./../GatheringJSCoverage/JSCoverage";

/**
 *      Group
 *          number
 *          category
 *              name
 *              testCase
 *                  name
 *                  nameOfFiles
 *                  countOfXXX
 */
class Group {
    constructor(number){
        this.number = number;
        this.categories = new Array();
    }
    addCategory(category){
        this.categories.push(category);
    }
    getCategories(){
        return this.categories;
    }
}

class Category {
    constructor(name){
        this.name = name;
        this.testCases = new Array();
    }
    addTestCase(testCase){
        this.testCases.push(testCase);
    }
    // getTestCase(name) {
    //     for (const testCase of this.testCases) {
    //         if(testCase.name === name){
    //             return testCase;
    //         }
    //     }
    //     return -1;
    // }
    getTestCases() {
        return this.testCases;
    }
}

class TestCase {
    constructor(name){
        this.name = name;
        this.nameOfFiles = new Array();
        // Javascript Functions
        this.countOfIFs = 0;
        this.countOfSwitchs = 0;
        this.countOfFors = 0;
        this.countOfForEachs = 0;
		this.countOfForIns = 0;
		this.countOfForOfs = 0;
        this.countOfWhiles = 0;
        // JSHint
        this.countOfCurly = 0;
        this.countOfEqeqeq = 0;
        this.countOfPrototypeOverwriting = 0;
        this.countOfLateDef = 0;
        this.countOfVarStmt = 0;
    }
    addNameOfFile(fileName){
        this.nameOfFiles.push(fileName);
    }

    getNameOfFiles(){
        return this.nameOfFiles;
    }

    setCountOfCodeLines(count){
        this.countOfCodeLines = count;
    }

    // Javascript Functions
    addCountOfIFs(count){
        this.countOfIFs += count;
    }
    addCountOfSwitchs(count){
        this.countOfSwitchs += count;
    }
    addCountOfFors(count){
        this.countOfFors += count;
    }
    addCountOfForEachs(count){
        this.countOfForEachs += count;
    }
	addCountOfForIns(count){
        this.countOfForIns += count;
    }
	addCountOfForOfs(count){
        this.countOfForOfs += count;
    }
    addCountOfWhiles(count){
        this.countOfWhiles += count;
    }

    // JSHint results
    addCountOfCurly(count){
        this.countOfCurly += count;
    }
    addCountOfEqeqeq(count){
        this.countOfEqeqeq += count;
    }
    addCountOfPrototypeOverwriting(count){
        this.countOfPrototypeOverwriting += count;
    }
    addCountOfLateDef(count){
        this.countOfLateDef += count;
    }
    addCountOfVarStmt(count){
        this.countOfVarStmt += count;
    }
}



function countOfAffectedFiles(groups){
    if(!fs.existsSync(JSCoveragePATH)){
        console.error("JSCoverage folder not found. Make sure to run the tests before starting the analysis.");
    }
    const groupsInput = fs.readdirSync(JSCoveragePATH);
    groupNumbers = groupsInput.filter(group => /^\d+$/.test(group));

    groupNumbers.forEach(groupNumber => {
        const testCategories = fs.readdirSync(JSCoveragePATH + "/" + groupNumber);

        let tmpGroup = new Group(groupNumber);
        testCategories.forEach(category => {
            let tmpCategory = new Category(category);

            const testCases = fs.readdirSync(JSCoveragePATH + "/" + groupNumber + "/" + category).sort((a, b) => a - b);
            let uniqueTestCases = new Array();

            testCases.forEach(testCase => {
                let testCaseName = testCase.substring(0, testCase.indexOf("_"));
                uniqueTestCases.push(testCaseName);
            });
            let tmpTestCases = new Array();
            tmpTestCases[0] = new TestCase(uniqueTestCases[0]);
            tmpTestCases[0].addNameOfFile(testCases[0]);

            // uniqueTestCases should contain the identical amount of entries as testCases. 
            // The only difference is, that testCases contains the whole filename, while uniqueTestCases contains only the testCases
            if(testCases.length != uniqueTestCases.length){
                console.error("Some random error appeared, please try again.");
                return -1;
            }

            for(let i=0, j=0; i< uniqueTestCases.length-1; i++){
                if(uniqueTestCases[i] !== uniqueTestCases[i+1]){
                    j++;
                    tmpTestCases[j] = new TestCase(uniqueTestCases[i+1]);   
                } 
                tmpTestCases[j].addNameOfFile(testCases[i+1]);
            }
            for (const tmpCase of tmpTestCases) {
                tmpCategory.addTestCase(tmpCase);
            }
            tmpGroup.addCategory(tmpCategory);    
        });
        groups.push(tmpGroup);
    });
}2


function countOfCodeLines(groups) {
    let analysisOverAllGroups = {};
    // one field that is beeing used over all testcases
    // analysisOverAllGroups["overAll"] = [];
    for(const group of groups){
        let groupNumber = group.number;
        for (const category of group.getCategories()) {
            for (const testCase of category.getTestCases()) {
                let codeLines = 0;
                let fileNames = testCase.getNameOfFiles();
                let testCaseName = testCase.name;
                if(!analysisOverAllGroups[testCaseName]){
                    analysisOverAllGroups[testCaseName] = {};
                }
                // if(!analysisOverAllGroups["overAll"][groupNumber]) {
                    // analysisOverAllGroups["overAll"][groupNumber] = resetAnalysisForGroup();
                // }
                analysisOverAllGroups[testCaseName][groupNumber] = resetAnalysisForGroup();
                for (const index in fileNames) {
                    const input = fs.readFileSync(JSCoveragePATH + "/" + group.number + "/" + category.name + "/" + fileNames[index], "utf-8");
					const countOfJSFunctions = countOfJavascriptFunctions(input);
					codeLines += getCodeLines(input);
                    testCase.addCountOfIFs(countOfJSFunctions.IFs);
                    analysisOverAllGroups[testCaseName][groupNumber]["if"] += countOfJSFunctions.IFs;
                    testCase.addCountOfSwitchs(countOfJSFunctions.Switchs);
                    analysisOverAllGroups[testCaseName][groupNumber]["switch"] += countOfJSFunctions.Switchs;
                    testCase.addCountOfFors(countOfJSFunctions.Fors);
                    analysisOverAllGroups[testCaseName][groupNumber]["for"] += countOfJSFunctions.Fors;
                    testCase.addCountOfForEachs(countOfJSFunctions.ForEachs);
                    analysisOverAllGroups[testCaseName][groupNumber]["forEach"] += countOfJSFunctions.ForEachs;
                    testCase.addCountOfForIns(countOfJSFunctions.ForIns);
                    analysisOverAllGroups[testCaseName][groupNumber]["forIn"] += countOfJSFunctions.ForIns;
                    testCase.addCountOfForOfs(countOfJSFunctions.ForOfs);
                    analysisOverAllGroups[testCaseName][groupNumber]["forOf"] += countOfJSFunctions.ForOfs;
                    testCase.addCountOfWhiles(countOfJSFunctions.Whiles);
                    analysisOverAllGroups[testCaseName][groupNumber]["while"] += countOfJSFunctions.Whiles;


                    const countOfJSHintErrs = countOfJSHintErrors(input);
                    testCase.addCountOfCurly(countOfJSHintErrs.Curly);
                    analysisOverAllGroups[testCaseName][groupNumber]["curly"] += countOfJSHintErrs.Curly;
                    testCase.addCountOfEqeqeq(countOfJSHintErrs.Eqeqeq);
                    analysisOverAllGroups[testCaseName][groupNumber]["eqeqeq"] += countOfJSHintErrs.Eqeqeq;
                    testCase.addCountOfPrototypeOverwriting(countOfJSHintErrs.PrototypeOverwriting);
                    analysisOverAllGroups[testCaseName][groupNumber]["protoypeOverwriting"] += countOfJSHintErrs.PrototypeOverwriting;
                    testCase.addCountOfLateDef(countOfJSHintErrs.LateDef);
                    analysisOverAllGroups[testCaseName][groupNumber]["lateDef"] += countOfJSHintErrs.LateDef;
                    testCase.addCountOfVarStmt(countOfJSHintErrs.VarStmt);
                    analysisOverAllGroups[testCaseName][groupNumber]["varStmt"] += countOfJSHintErrs.VarStmt;
                }
                analysisOverAllGroups[testCaseName][groupNumber]["files"] = testCase.getNameOfFiles().length;
                analysisOverAllGroups[testCaseName][groupNumber]["codeLines"] = codeLines;
                testCase.setCountOfCodeLines(codeLines);
            }
        }
        console.log("Finished gathering the Informations for Group " + group.number);
    }

    return analysisOverAllGroups;
}

function resetAnalysisForGroup(){
    let analysis = {};

    analysis["if"] = 0;
    analysis["switch"] = 0;
    analysis["for"] = 0;
    analysis["forEach"] = 0;
    analysis["forIn"] = 0;
    analysis["forOf"] = 0;
    analysis["while"] = 0;

    analysis["curly"] = 0;
    analysis["eqeqeq"] = 0;
    analysis["protoypeOverwriting"] = 0;
    analysis["lateDef"] = 0;
    analysis["varStmt"] = 0;

    analysis["files"] = 0;
    analysis["codeLines"] = 0;

    return analysis;
}



function writeResults(groups){
    const outputData = JSON.stringify(groups, null, "\t");
    fs.writeFileSync("./resultsPerGroup.json", outputData);
}

// counts the lines with actual code in it (non-empty and not a comment - line or block)
function getCodeLines(JSCode){
	JSCodeLines = new Array();
	JSCodeLines = JSCode.split("\n");
	let codeLines = 0;
	
	for (const codeLine of JSCodeLines){
		if(codeLine.trim().length > 0){
			if(!/^\s*(\/\/|\/\*\*|\*\/|\*)/.test(codeLine)){
				codeLines ++;
			}
		}
	}
	
	return codeLines;
}

function countOfJavascriptFunctions(JSCode) {
    let ifs, switchs, fors, forEachs, forIns, forOfs, whiles;

    ifs = switchs = fors = forEachs = forIns = forOfs = whiles = 0;

    ifs     = JSCode.match(/if\s*\(/g);
    ifs     = ifs === null ? 0 : ifs.length;
    switchs = JSCode.match(/switch\s*\(/g);
    switchs = switchs === null ? 0 : switchs.length;
    fors    = JSCode.match(/for\s*\(.*;.*;.*\)/g);
    fors    = fors === null ? 0 : fors.length;
    forEachs= JSCode.match(/forEach\s*\(/g);
    forEachs= forEachs === null ? 0 : forEachs.length;
    forIns	= JSCode.match(/for\s*\(.*\s+in\s+.*\)/g);
    forIns	= forIns === null ? 0 : forIns.length;
    forOfs	= JSCode.match(/for\s*\(.*\s+of\s+.*\)/g);
    forOfs	= forOfs === null ? 0 : forOfs.length;
    whiles  = JSCode.match(/while\s*\(/g);
    whiles  = whiles === null ? 0 : whiles.length;
    
    return {
        IFs: ifs,
        Switchs: switchs,
        Fors: fors,
        ForEachs: forEachs,
		ForIns: forIns,
		ForOfs: forOfs,
        Whiles: whiles
    }
}

function countOfJSHintErrors(JSCode) {

    let curly, eqeqeq, prototypeOverwriting, latedef, varstmt;

    curly = eqeqeq = prototypeOverwriting = latedef = varstmt = 0;
    const JSHintOptions = {
        // https://jshint.com/docs/options/
        // use {} everytime (even if not necessary e.g. if(...) with one following statement)
        curly: true,
        // no ==, != --> ===, !==
        eqeqeq: true,
        // ECMAScript version 8 (let, const is in 6)
        esversion: 8,
        // no overwriting of prototypefunctions
        freeze: true,
        // no usage of variables before they are defined
        latedef: true,
        // max Errcount before JSHint gives up
        maxerr: 9999,
        // no "var", only "let" and "const"
        varstmt: true
     };
     jsHint(JSCode, JSHintOptions);
     for (const error of jsHint.errors) {
         // curly brackets
         if(error.reason.match(/Expected '{' and instead saw/g)) {
            curly++;
         }
         // ===, !==
         if(error.reason.match(/Expected '===' and instead saw/g)){
            eqeqeq++;
         }
         if(error.reason.match(/Expected '!==' and instead saw/g)) {
             eqeqeq++;
         }
         // overwriting of prototype functions
         if(error.reason.match(/Extending prototype of native object:/g)){
            prototypeOverwriting++;
         }
         // variable/function gets used before it is defined
         if(error.reason.match(/was used before it was defined./g)){
             latedef++;
         }
         // no "var" declaration, only "let" and "const"
         if(error.reason.match(/Use `let` or `const` instead./g)){
            varstmt++;
         }
     }
     return {
         Curly: curly,
         Eqeqeq: eqeqeq,
         PrototypeOverwriting: prototypeOverwriting,
         LateDef: latedef,
         VarStmt: varstmt
     }
}


function writeAnalysisResults(analysisOverAllGroups) {
    const outputData = JSON.stringify(analysisOverAllGroups, null, "\t");
    fs.writeFileSync("./resultsPerTestCase.json", outputData);
}





async function runAnalyses(){
    let groups = new Array();
  
    if(countOfAffectedFiles(groups) === -1){
        return;
    }
    const analysisOverAllGroups = countOfCodeLines(groups);
    writeResults(groups);
    writeAnalysisResults(analysisOverAllGroups);
    
}

runAnalyses();

