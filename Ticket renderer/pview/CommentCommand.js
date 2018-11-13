
//CommentCommand class process comment lines
class CommentCommand
{

    /* execute function process comment lines from ticket file
    @scriptLine line from ticket file
    */
    execute (scriptLine){
        var commentPattern = /^\s*;.*$/;
        if (commentPattern.test(scriptLine))
        {
           //nothing to do 
        }
    }
}
exports.CommentCommandProcessor = new CommentCommand();