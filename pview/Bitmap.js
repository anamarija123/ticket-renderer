const convert = require ("./Converter");
const printer = require ("./Printer");

//BitmapCommand class process lines with bitmap path in ticket file
class BitmapCommand
{

    /*
    setBitmapPath function set path to destination in file where bitmap is placed
    @resource path to bitmap
    */
    setBitmapPath (resource)
    {
        this.resourceName = resource;
    }

    /*
    execute function append path to folder and path to bitmap from ticket file in one path
    @scriptline path to bitmap 
    */
    execute (scriptLine)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;  
        var bitmapPattern = /^\s*BITMAP\s*/;

        if (bitmapPattern.test(scriptLine)){
            var bitmapName= scriptLine.split("BITMAP ");
            var bitmapPath = this.resourceName.concat(bitmapName[1].trim());
            debugConsole.appendLine("BITMAP PATH CONCATENATED " + bitmapPath);
            var convertedLine = convert.converter.convert(scriptLine, bitmapPath);
            printer.Printer.print(convertedLine);
        }
    }
}
exports.BitmapCommand = new BitmapCommand();
