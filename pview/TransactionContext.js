// TransactionContext process input file 

class TransactionContext {
    /*
    readFromInputFile function read from input file and save it to contextDictionary key(tag) - value
    @entryFile path to entry file loaded from ticket file
    @return filled contextDictionary
    */
    readFromInputFile (entryFile)
    {
        const vscode = require('vscode');
        let debugConsole = vscode.debug.activeDebugConsole;
        var fs = require('fs');
        var dataFromEntryFile = fs.readFileSync(entryFile, "Latin1");
        var linesFromEntryFile = dataFromEntryFile.split("\n");
       
        var costumLines;
        var contextDictionary = {};

        linesFromEntryFile.forEach(line => {
            costumLines = line.split("=", 2);
            if (costumLines != null || costumLines.length > 1)
            {
                contextDictionary[costumLines[0].trim()] = costumLines[1].trim();
            } 
        });

        return contextDictionary;
    }  
}
exports.TransactionContext = new TransactionContext();