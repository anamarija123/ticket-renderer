const convert = require ("./Converter");
const printer = require ("./Printer");

class FeedCommand
{

    /* execute function process FEED command
    @scriptline line from ticket file 
    */
    execute (scriptLine)
    {
        //feedPattern to check if is present specific keyword
        var feedPattern = /^\s*FEED\s+\d\s*$/;
        var expressionToPrint="";
        
        if (feedPattern.test(scriptLine)){
            var linesToPrint = scriptLine.match(/\d+/)
            while (linesToPrint !== 0)
            {
                expressionToPrint=convert.converter.convert(scriptLine,scriptLine);
                printer.Printer.print(expressionToPrint);
                --linesToPrint;
            }
        }
    } 
}
exports.FeedCommandProcessor = new FeedCommand();
