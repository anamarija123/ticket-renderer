const expression = require ("./ExpressionProcessor");
const RTCconvert = require ("./RTConverter");
const converterToHtml=require ("./Converter");
const printer = require ("./Printer");

//PrintRichTextCommand class process line with PRINTRT keyword
class PrintRichTextCommand
{
    /*execute function process only lines with PRINTRT keyword. Function extract expression between quotation marks and send it to specific functions
    @scriptline line from ticket file */

    execute (scriptLine)
    {
        const vscode = require('vscode');
        let debugConsole = vscode.debug.activeDebugConsole;
        //printRtPattern to check if is present specific keyword
        var printRtPattern = /^\s*PRINTRT\s+\".*\"\s*$/;
        var expressionToPrint = "";
        var newFormatExpression = "";
        var newExpression
        var styledExpression;
     
        //check if scriptline contains expression 
        if (printRtPattern.test(scriptLine))
        {
            // match function returns array and matched expression is in first element of array
            var printRTExpression = scriptLine.match(/\".*\"/);
            if (printRTExpression != null)
            {
                //sending expression between quotation marks to expression processor process function.
                expressionToPrint =  expression.processor.process(printRTExpression[0]);

                //newFormatExpression is new expression with replaced escape sequences
                newFormatExpression = RTCconvert.RTConverter.convert(expressionToPrint);
                newExpression = newFormatExpression.match(/\".*\"/);
                if (newExpression != null)
                {
                    styledExpression = converterToHtml.converter.convert(newFormatExpression, newExpression[0]);
                    debugConsole.appendLine("PrintRichTextCommand.execute: " + styledExpression);
                    printer.Printer.print(styledExpression);
                }
            }       
        }
    } 
}
exports.PrintRichTextCommandProcessor = new PrintRichTextCommand();
