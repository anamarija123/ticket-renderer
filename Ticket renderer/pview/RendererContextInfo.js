


//RendererContextInfo class process required paths
class RendererContextInfo 
{
    setScriptlines (scriptLines)
    {
        this.scriptLines = scriptLines;
        const vscode = require('vscode');
        let debugConsole = vscode.debug.activeDebugConsole;
        debugConsole.appendLine("UCITANO!");
    }

    /*
    getFilesInfoFromTicket function gets resource and testfile paths and send them to specific funtions. Function also read and output path.
    @scriptlines lines from ticket
    @returns output file path
    */
    getPath (pattern) 
    {
        const vscode = require('vscode');
        var fs = require('fs');
        var filePath;
    
        for (var i = 0; i < this.scriptLines.length; ++i)
        { 
            if (pattern.test(this.scriptLines[i]))
            {
                filePath=this.scriptLines[i].replace(pattern,"").trim();
                vscode.debug.activeDebugConsole.appendLine("Putanja za file: " + filePath);
                return filePath;
            }
           
        }
    }
}
exports.RendererContextInfo = new RendererContextInfo();
//exports.RendererContextInfo = RendererContextInfo();