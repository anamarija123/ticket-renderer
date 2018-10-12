
//Printer class print lines to output file

class Printer{
    /*
    setOutputFile function set output file path as public property
    @filePath is path to output file
    */
    setOutputFile(filePath)
    {    
        const vscode = require('vscode');
        this.filePath=filePath;
        vscode.debug.activeDebugConsole.appendLine("OUTPUT FILE PATH " + this.filePath);
    }
    
    /*
    open function erase file if is created before with same name or create new and write default html lines into it
    */
    open()
    {
        var fs = require('fs');
        const vscode = require('vscode');
        vscode.debug.activeDebugConsole.appendLine("OUTPUT FILE PATH " + this.filePath);
        
        fs.unlink (this.filePath, function(err)
        {
            if (err) throw err;
        });
        
        fs.appendFileSync(this.filePath, '<html>');
        fs.appendFileSync(this.filePath, '<head>');
        fs.appendFileSync(this.filePath, '<meta http-equiv="Content-Type" content="text/html;charset=UTF8">');
        fs.appendFileSync(this.filePath, '<style>');
        fs.appendFileSync(this.filePath, this.fillFileWithStyle ());
        fs.appendFileSync(this.filePath, '</style>');
        fs.appendFileSync(this.filePath, '</head>');
        fs.appendFileSync(this.filePath, '<body>');

    }

    
    //fillFileWithStyle function append default css lines in html file    
    fillFileWithStyle ()
    {
        var fs = require('fs');
        fs.appendFileSync(this.filePath, "table { width:100%; }");
        fs.appendFileSync(this.filePath, "body { font-family:monospace; }");
        fs.appendFileSync(this.filePath, ".ERROR { background:red; }");
        fs.appendFileSync(this.filePath, ".BOLD { font-weight:bold; }");
        fs.appendFileSync(this.filePath, ".CENTERED { text-align:center; }");
        fs.appendFileSync(this.filePath, ".CENTER { display: block; margin-left: auto; margin-right: auto; width: 20%; }");
        fs.appendFileSync(this.filePath, ".RIGHT { text-align:right; }");
        fs.appendFileSync(this.filePath, ".LEFT { text-align:left; }");
        fs.appendFileSync(this.filePath, ".BIG { font-size:big; }");
        fs.appendFileSync(this.filePath, ".SMALL { font-size:small; }");
        fs.appendFileSync(this.filePath, ".INVERTED { background-color:black;font-color=white; }");
        fs.appendFileSync(this.filePath, "p { -webkit-transform-origin: 0 0; -moz-transform-origin: 0 0; -ms-transform-origin: 0 0; -o-transform-origin: 0 0; transform-origin: 0 0; }");
        fs.appendFileSync(this.filePath, "p.DOUBLEWIDTH { -webkit-transform: scaleX(2); -moz-transform: scaleX(2); -ms-transform: scaleX(2); -o-transform: scaleX(2); transform: scaleX(2);  }");
        fs.appendFileSync(this.filePath, "p.DOUBLEWH { -webkit-transform: scaleX(2) scaleY(2); -moz-transform: scaleX(2) scaleY(2); -ms-transform: scaleX(2) scaleY(2); -o-transform: scaleX(2) scaleY(2); transform: scaleX(2) scaleY(2); }");
        fs.appendFileSync(this.filePath, "p.DOUBLEHEIGHT { -webkit-transform: scaleY(2); -moz-transform: scaleY(2); -ms-transform: scaleY(2); -o-transform: scaleY(2); transform: scaleY(2); }");
    }

    /*
    print function append lines to file in specific html format
    @expression specific formated line
    */
    print (expression)
    {
        const vscode = require("vscode");
        let debugConsole = vscode.debug.activeDebugConsole;        
        var fs = require ('fs');

        debugConsole.appendLine("ovako SE UPISUJE U FAJL" + expression);
        fs.appendFileSync(this.filePath, expression);
    }

    //close function append format for end of file
    close()
    {
        var fs = require('fs');
        fs.appendFileSync(this.filePath, '</body>');
        fs.appendFileSync(this.filePath, '</html>');
    }
}
exports.Printer = new Printer();
