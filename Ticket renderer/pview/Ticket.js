"use strict";

/*
 The module "vscode" contains the VS Code extensibility API
 Import the modules and reference them with the alias
*/

const vscode = require("vscode");
const TicketInterpreter = require("./TicketInterpreter");
const renderer = require ("./RendererContextInfo");
const context = require ("./TransactionContext");
const transactionData = require ("./transactionData");
const expressionProcessor = require ("./ExpressionProcessor");
const printer = require ("./Printer");
const bitmap = require ("./Bitmap");

/*
 this method is called when your extension is activated
 your extension is activated the very first time the command is executed
*/
function activate(context)
 {
     /*
     Use the console to output diagnostic information (console.log) and errors (console.error)
     This line of code will only be executed once when your extension is activated
     */
    console.log("Congratulations, your extension 'pview' is now active!");

    /*
     The command has been defined in the package.json file
     Now provide the implementation of the command with  registerCommand
     The commandId parameter must match the command field in package.json
    */
    let disposable = vscode.commands.registerCommand("Ticket.preview", previewTicket);

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate()
{
}
exports.deactivate = deactivate;


// previewTicket function read ticket file, throw exception if ticket is empty
function previewTicket()
{
    vscode.debug.activeDebugConsole.appendLine("PreviewTicket start");
    let editor = vscode.window.activeTextEditor;
    var contextDictionary;
    if (!editor)
    {
        vscode.debug.activeDebugConsole.appendLine("PreviewTicket editor not found");
        return;
    }
    
    let scriptText = editor.document.getText();
    var scriptLines = scriptText.split("\n");

    if (scriptLines == null)
    {
        throw "Ticket script contains no lines.";
    }

    vscode.debug.activeDebugConsole.appendLine("PreviewTicket lines collected " + scriptLines.length);

    let ticketInterpreter = new TicketInterpreter.TicketInterpreter(scriptLines);

    vscode.debug.activeDebugConsole.appendLine("PreviewTicket ticket interpreter constructed");

    vscode.debug.activeDebugConsole.appendLine("PreviewTicket transaction section preview start");

    renderer.RendererContextInfo.setScriptlines(scriptLines);
    var outputFile = renderer.RendererContextInfo.getPath(/\;OUTPUT/g);
    var bitmapFile = renderer.RendererContextInfo.getPath(/\;RESOURCE/);
    var inputFile = renderer.RendererContextInfo.getPath(/\;TESTFILE/);

    if (outputFile != null)
    {
        printer.Printer.setOutputFile(outputFile);
    }  
    if (bitmapFile != null)
    {
        bitmap.BitmapCommand.setBitmapPath(bitmapFile);
    }
    if (inputFile != null)
    {
        contextDictionary = context.TransactionContext.readFromInputFile(inputFile);
    }

    transactionData.TranData.setTransactionData(contextDictionary);
    expressionProcessor.processor.setTransactionDataObject(transactionData);
   
    ticketInterpreter.process(contextDictionary["PROCEDURE_NAME"]);

    //HTML preview in VS Code
    let success = vscode.commands.executeCommand("vscode.previewHtml", "file:///" + outputFile);

    vscode.debug.activeDebugConsole.appendLine("PreviewTicket transaction section preview end");
   
    vscode.debug.activeDebugConsole.appendLine("PreviewTicket end");
}
