
//TransactionData process tags from ticket file
class TransactionData 
{
    /*
    setTransactionData function set dictionary of ticket file as public property
    @context is filled dictionary of keys and values from ticket file
    */
    setTransactionData (context)
    {
        const vscode = require('vscode');
        let debugConsole = vscode.debug.activeDebugConsole;
        this.context=context;
        debugConsole.appendLine("TransactionData.setTransactionData Transaction data set, procedure name = " + this.context["PROCEDURE_NAME"]);
    }

    /*
    getValue function processing through dictionary of keys and values and searching if required tag exist and has value
    @tag specific key in dictionary
    @ return value of specific key in dictionary, if it doesnt exists returns null 
    */
    getValue (tag)
    {
        if (this.context.hasOwnProperty(tag))
        {
            return this.context[tag];
        }
               
        return null;
    }
}
exports.TranData = new TransactionData();
