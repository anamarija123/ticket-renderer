const expression = require ("./ExpressionProcessor");

//IfGotoCommand process lines with both if and goto keywords
class IfGotoCommand
{
    //constructor gets reference on instance which is instanced from ProgramJumpHandler and save it to this.variable (like public property)
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

    /*Execute function process line if it contains both if and goto keywords. It compares two expressions and proceed further depending on result.
    @scriptline line from ticket file
    */
    execute(scriptLine)
    {
        var gotoPattern = /^\s*IF\s+(\".*\")\s+(\=|\!\=)\s+(\".*\")\s*GOTO\s+\$\w+\s*$/;
        if (gotoPattern.test(scriptLine))
        {
            if (this.jumpRequestedHandler != null)
            {
                var leftExpressionResult="";
                var rightExpressionResult="";
                var operator="";
                var matches = scriptLine.match(gotoPattern);
                
                if(matches!=null)
                {
                    leftExpressionResult = expression.processor.process(matches[1]);
                    operator = matches[2];
                    rightExpressionResult = expression.processor.process(matches[3]);
                }

                if (
                    (operator == "=" && leftExpressionResult == rightExpressionResult) || 
                    (operator == "!=" && leftExpressionResult != rightExpressionResult)
                )
                {
                    var gotoLabelNamePattern = /\$\w+/;
                    //getting label from line and store it to label variable
                    var label = scriptLine.match(gotoLabelNamePattern);
                    if (label != null)
                    {
                        this.jumpRequestedHandler.processJump(label);  
                    }
                }                
            }
        }
    }
}
exports.IfGotoCommandProcessor = new IfGotoCommand();
