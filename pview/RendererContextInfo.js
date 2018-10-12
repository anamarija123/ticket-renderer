const Printer = require ("./Printer");
const bitmap = require ("./Bitmap");

//RendererContextInfo class process required paths
class RendererContextInfo 
{
    /*
    getFilesInfoFromTicket function gets resource and testfile paths and send them to specific funtions. Function also read and output path.
    @scriptlines lines from ticket
    @returns output file path
    */
    getFilesInfoFromTicket (scriptLines) 
    {
        const vscode = require('vscode');
        var fs = require('fs');
        var filePath;
        var inputFileName;
        var resourceName;
        var filePathPattern = /\;OUTPUT/g;
        var entryFilePattern = /\;TESTFILE/;
        var bitmapPattern = /\;RESOURCE/;
        for (var i = 0; i < scriptLines.length; ++i)
        { 
            if (filePathPattern.test(scriptLines[i]))
            {
                filePath=scriptLines[i].replace(/\;OUTPUT/,"").trim();
                vscode.debug.activeDebugConsole.appendLine("Putanja za izlazni file: " + filePath);
                Printer.Printer.setOutputFile(filePath);
            }
            else if (entryFilePattern.test(scriptLines[i]))
            {
                inputFileName=scriptLines[i].replace(/\;TESTFILE/,"").trim();
                vscode.debug.activeDebugConsole.appendLine("Putanja za ulazni file: " + inputFileName);
            }
            else if (bitmapPattern.test(scriptLines[i]))
            {
                resourceName=scriptLines[i].replace(/\;RESOURCE/,"").trim();
                vscode.debug.activeDebugConsole.appendLine("Putanja za bitmap: " + resourceName);
                bitmap.BitmapCommand.setBitmapPath(resourceName);
            }
        }
        return inputFileName;
    }
}
exports.RendererContextInfo = new RendererContextInfo();