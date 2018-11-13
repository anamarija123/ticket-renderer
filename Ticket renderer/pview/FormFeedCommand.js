const convert = require ("./Converter");
const printer = require ("./Printer");
//FormFeedCommand process lines with both FORM FEED keywords
class FormFeedCommand
{

    /* execute function process lines with FORM FEED keyword and send it to converter 
    @scriptline line from ticket file */
    execute (scriptLine)
    {
        //formFeedPattern to check if is present specific keyword
        var formFeedPattern = /^\s*FORM\s+FEED\s*$/;
        var expressionToPrint="";

        if (formFeedPattern.test(scriptLine))
        {
           expressionToPrint=convert.converter.convert(scriptLine,scriptLine);
           printer.Printer.print(expressionToPrint);
        }
    } 
}
exports.FormFeedCommandProcessor = new FormFeedCommand();
