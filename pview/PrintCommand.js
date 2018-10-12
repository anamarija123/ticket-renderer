const expression = require ("./ExpressionProcessor");
const convert = require ("./Converter");
const printer = require ("./Printer");

//PrintCommand class process line with PRINT keyword
class PrintCommand
{
    /* execute function process only lines with PRINT keyword. Function extract expression between quotation marks and send it to specific functions
    @scriptline line from ticket file */
    execute (scriptLine)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;        
        
        //printPattern to check if is present specific keyword
        var printPattern = /^\s*PRINT\s+(:?\w+\s+){0,2}\".*\"\s*$/;
       
        //check if scriptline contains expression 
        if (printPattern.test(scriptLine))
        {
             // match function returns array and matched expression is in first element of array
            var printExpression = scriptLine.match(/\".*\"/);
            if (printExpression != null)
            {
                //sending expression between quotation marks to expression processor process function.
                var expressionToPrint = expression.processor.process(printExpression[0]);
                debugConsole.appendLine("EKSPRESN text to print" + expressionToPrint);
                var convertedLine = convert.converter.convert(scriptLine, expressionToPrint);
                printer.Printer.print(convertedLine);
                debugConsole.appendLine("PrintCommand.execute text to print" + convertedLine);
            }             
        }               
    }
}
exports.PrintCommandProcessor = new PrintCommand();
