
//GotoCommand process lines with goto keywords
class GotoCommand
{
    // GotoCommand in constructor gets reference on instance which is instanced from ProgramJumpHandler and save it to this.variable
    constructor()
    {
        this.jumpRequestedHandler = null;
    }

    /*setJumpRequestedHandler function set handler as public property
    @jumpRequestedHandler handler object*/
    setJumpRequestedHandler(jumpRequestedHandler)
    {
        this.jumpRequestedHandler = jumpRequestedHandler;
    }

    /*execute function process lines with GOTO keyword. It sends expression between quotation marks to processJump function
    @scriptLine line from ticket file
    */
    execute(scriptLine)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;  

        //gotoPattern to find specific keyword in scriptline
        var gotoPattern = /^\s*GOTO\s+\$\w+\s*$/;

        debugConsole.appendLine("GotoCommand.execute Testing if GOTO command" + scriptLine);

        if (gotoPattern.test(scriptLine))
        {
            debugConsole.appendLine("GotoCommand.execute Start processing GOTO: " + scriptLine);
            if (this.jumpRequestedHandler != null)
            {                
                //getting label from line and store it to label variable
                var label = scriptLine.match(/\$\w+/);
                if (label != null)
                {
                    debugConsole.appendLine("GotoCommand.execute Jump to " + label);
                    this.jumpRequestedHandler.processJump(label);  
                }
                else
                {
                    debugConsole.appendLine("GotoCommand.execute Jump label not extracted");
                }
            }
            else
            {
                debugConsole.appendLine("GotoCommand.execute Jump request handler not defined");
            }
        }
    }
}
exports.GotoCommandProcessor = new GotoCommand();
