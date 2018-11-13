
//EmptyCommand class process empty lines
class EmptyCommand
{ 
    /* execute function process empty line
    @scriptline line from ticket file
    */
    execute (scriptLine)
    {
        var emptyPattern = /^\s*$/;

        //if is detected empty line, print new line
        if (emptyPattern.test(scriptLine))
        {            
            //Skip the empty line
        }
    }
}
exports.EmptyCommandProcessor = new EmptyCommand();
