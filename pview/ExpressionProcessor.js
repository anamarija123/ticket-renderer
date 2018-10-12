const formater = require("./Format");

//ExpressionProcessor class process tags and its format from ticket file 
class ExpressionProcessor
{
    /*
    setTransactionDataObject function is public property of context dictionary filled from ticket file
    @transactionData context dictionary
    */
    setTransactionDataObject (transactionData)
    {
        this.transactionData=transactionData;
    }

     /*
    process function process tag and its format 
    @expression data from ticket file
    @return readed and formated data from user input
    */
    process (expression)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;  
        var expressionsToPrint = "";
        if (expression != null)
        {
            debugConsole.appendLine("ExpressionProcessor.process Processing expression " + expression);
          //  expressionsToPrint = this.procesLine(/(\[[^]+\])/g, expression);
            expressionsToPrint = this.procesLine(/(\[[\w]+\])/g, expression);
            debugConsole.appendLine("ExpressionProcessor.process 1st processLine " + expressionsToPrint);
            expressionsToPrint = this.procesLine(/(\#[^#]+\#)/g, expressionsToPrint);
            debugConsole.appendLine("ExpressionProcessor.process 2nd processLine " + expressionsToPrint);
        }      
        debugConsole.appendLine("ExpressionProcessor.process processed expression " + expressionsToPrint);      
        return expressionsToPrint;
    }

    /*
    procesLine function processing each tag - format given from line in ticket file
    @pattern regular expression to match specific data
    @lineToProcess line from ticket file
    @return processed line
    */
    procesLine(pattern, lineToProcess)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;
        
        if (pattern.test(lineToProcess))
        {
            var expressionsToProcess = lineToProcess.match(pattern);//match returns array containing the entire matched string as the first element
            if (expressionsToProcess != null)
            {
                expressionsToProcess.forEach(expressionToProcess => {
                    if (expressionToProcess != null)
                    {
                        lineToProcess = lineToProcess.replace(expressionToProcess, this.processExpression(expressionToProcess));    
                        debugConsole.appendLine("ExpressionProcessor.procesLine line after replace " + lineToProcess);
                    }
                });
            }
        }
        return lineToProcess;
    }

    /*
    processExpression function replace every tag with value from public dictionary and format from format function
    @expressionToProcess specific expresion to process
    @return processed expresion
    */
    processExpression(expressionToProcess)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;

        var format_TypeSpecifier = "";
        var expressionToPrint;
        var expressionArguments = expressionToProcess.replace("#", "").replace("[","").replace("]","").replace("#", "").split(",", 2);
        var tag = expressionArguments[0];
        var format = expressionArguments[1];
        
        var tagValue = this.transactionData.TranData.getValue (tag);
        if (tagValue == null)
        {
            debugConsole.appendLine("ExpressionProcessor.processExpression tag value is missing " + tag);
            return "!" + tag + "!";
        }

        if (format != null && format != "")
        {            
            debugConsole.appendLine("ExpressionProcessor.processExpression format used " + format);            
            //Na ovaj način se uklanjaju : i iz custom formata, potrebno je format prepoznati po cijelom nizu, npr $:AMT
            format_TypeSpecifier = expressionArguments[1].replace("#", "");
            debugConsole.appendLine("ExpressionProcessor.processExpression format used " + format_TypeSpecifier);
            expressionToPrint = formater.format.format (tagValue, format_TypeSpecifier);
            debugConsole.appendLine("IMA FORMAT " + expressionToPrint);
        }
        else
        {
            expressionToPrint = tagValue;
            debugConsole.appendLine("NEMA FORMAT " + expressionToPrint);
        }

        return expressionToPrint;
    }
}
exports.processor = new ExpressionProcessor();