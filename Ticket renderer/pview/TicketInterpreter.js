/*
 The module "vscode" contains the VS Code extensibility API
 Import the modules and reference them with the alias 
*/
"use strict";
const vscode = require("vscode");
const printCommand = require("./PrintCommand");
const printRichTextCommand = require("./PrintRichTextCommand");
const ifGotoCommand = require("./IfGotoCommand");
const gotoCommand = require("./GotoCommand");
const commentCommand = require("./CommentCommand");
const emptyCommand = require("./EmptyCommand");
const formFeedCommand = require("./FormFeedCommand");
const feedCommand = require("./FeedCommand");
const printer = require ("./Printer");
const bitmap = require ("./Bitmap");


// class TicketInterpreter serves to process through ticket file
class TicketInterpreter
{
    /*
    constructor fills the list with all commands
    @scriptlines param - list of all lines in ticket file
    */
    constructor  (scriptLines)
    {       
        if (scriptLines == null)
        {
            throw "TicketInterpreter.constructor Ticket script not provided";
        }
        this.scriptLines = scriptLines;        
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.constructor script lines received with total of " + scriptLines.length + " lines.");

        this.programCounter = 0;
        this.procedureStartLineNumber = 0;
        this.procedureEndLineNumber = 0;

        let commandProcessors = [];       
        commandProcessors.push(printCommand.PrintCommandProcessor);
        commandProcessors.push(printRichTextCommand.PrintRichTextCommandProcessor);
        commandProcessors.push(ifGotoCommand.IfGotoCommandProcessor);
        ifGotoCommand.IfGotoCommandProcessor.setJumpRequestedHandler(this);
        commandProcessors.push(gotoCommand.GotoCommandProcessor);
        gotoCommand.GotoCommandProcessor.setJumpRequestedHandler(this);
        commandProcessors.push(commentCommand.CommentCommandProcessor);
        commandProcessors.push(emptyCommand.EmptyCommandProcessor);
        commandProcessors.push(bitmap.BitmapCommand);
        commandProcessors.push(formFeedCommand.FormFeedCommandProcessor);
        commandProcessors.push(feedCommand.FeedCommandProcessor);
        this.commandProcessors = commandProcessors;
    }
    /*
    findProcedureStartLine function searching procedure name in list of all lines from ticket file. If doesnt find, function throw exception.
    @procedureName param - procedure name of start line
    @return number of line where procedure name is found 
    */
    findProcedureStartLine (procedureName)
    {
        if (this.scriptLines == null)
        {
            throw "TicketInterpreter.findProcedureStartLine script not available.";
        }
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.findProcedureStartLine searching for " + procedureName + " in " + this.scriptLines.length + " lines of the script.");
        
        //start of section
        var procedureBeginPattern = new RegExp("^\\s*BEGIN\\s+" + procedureName);
        for (var i = 0; i < this.scriptLines.length; ++i)
        { 
            if (procedureBeginPattern.test(this.scriptLines[i]))
            {
                vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.findProcedureStartLine procedure " + procedureName + " found at line " + (i + 1) + " .");
                return i;
            }
        }

        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.findProcedureStartLine procedure " + procedureName + " not found.");
        throw "Procedure " + procedureName + " not found";
    }

    /*
    findProcedureEndLine function searching first appearence of END after found start line
    @firstProcedureLine - first start line
    @return number of last line which contains END keyword
    */
    findProcedureEndLine (firstProcedureLine)
    {
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.findProcedureEndLine searching for procedure end line from line " + (firstProcedureLine + 1) + ".");

        var lastProcedureLine = firstProcedureLine;
        var procedureEndPattern = /^\s*END\s*$/;
        while (lastProcedureLine < this.scriptLines.length && !procedureEndPattern.test(this.scriptLines[lastProcedureLine]))
        {
            ++lastProcedureLine;
        }

        return lastProcedureLine;
    }

    /*
    process function iterate through lines between start line and end line and send each line to each commandProcessor
    @procedureName - procedure name of start line
    */
    process(procedureName)
    {
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.Process processing the procedure named " + procedureName + ".");

        //start of section - calling function to find procedure name
        this.procedureStartLineNumber = this.findProcedureStartLine(procedureName);
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.Process procedure found at " + (this.procedureStartLineNumber + 1) + ".");

        //end of section - calling function to find end
        this.procedureEndLineNumber = this.findProcedureEndLine(this.procedureStartLineNumber);
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.Process procedure ends at " + (this.procedureEndLineNumber + 1) + ".");
        this.programCounter = this.procedureStartLineNumber;

        //calling open function in printer to write html begining tags in .html file
        printer.Printer.open();
        while (this.programCounter < this.procedureEndLineNumber)
        {
            vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.Process processing line " + (this.programCounter + 1) + ".");
            this.commandProcessors.forEach(commandProcessor =>{
                commandProcessor.execute(this.scriptLines[this.programCounter])
            })
            //Move to the next line
            ++this.programCounter;
        }
        //calling close function in printer to write html ending tags in .html file
        printer.Printer.close();
    } 

    /*
    processJump function processing jump to specific line in ticket
    @jumpToLabel name of label to jump
    @return when label to jump is find or throw exception if is not found

    */
    processJump(jumpToLabel)
    {
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.jumpRequested requested jump to " + jumpToLabel + ".");

        //get next line after ifgoto/goto expression and save the number of line in findLabelCounter
        var findLabelCounter = this.programCounter + 1;
        var labelPattern = new RegExp("LABEL\\s+\\" + jumpToLabel);

        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.jumpRequested searching between " + (findLabelCounter + 1) + " and " + (this.procedureEndLineNumber + 1) + " for a line matching " + labelPattern + " pattern.");

        //iterate through section
        while (findLabelCounter < this.procedureEndLineNumber)
        {
            //vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.jumpRequested testing: " + this.scriptLines[findLabelCounter]);
            
            if (labelPattern.test(this.scriptLines[findLabelCounter])) 
            {
                vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.jumpRequested jumping to line " + findLabelCounter + ".");

                /*set this.programCounter on the line from where iterate next
                this.programCounter is public variable and number of jumped section is available to everyone*/
                this.programCounter = findLabelCounter; 
                return;
            }
            ++findLabelCounter;
        }
        
        vscode.debug.activeDebugConsole.appendLine("TicketInterpreter.jumpRequested Label " + jumpToLabel + " not found.");

        throw "TicketInterpreter.jumpRequested Label " + jumpToLabel + " not found."
    }
}
exports.TicketInterpreter = TicketInterpreter;
