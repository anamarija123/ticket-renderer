//RTConverter class processing PRINTRT escape sequences from ticket file
class RTConverter{

/*
convert function searching specific escape sequences in line of PRINTRT command and send it to replaceEscapeSequence to process.
Returned expression is new expression.
@expression full line from ticket file and chosen context
@return new expression with replaced escape sequences
*/
    convert (expression)
    {
        var escapeSequences = [];
        var newExpression = "";
        var regularExpression = /\$[cbiNCWHDQ]/g;
       
        escapeSequences = expression.match(regularExpression);
        if (escapeSequences != null)
        {
            //for every escapeSequence,  remove escapeSequence from expression
            escapeSequences.forEach(escapeSequence => {
                expression = expression.replace(escapeSequence, "");

                //new expression is replaced escape sequence
                newExpression += this.replaceEscapeSequence(escapeSequence);
            });
        }

        //add proceeded expression to new expression
        newExpression += expression;
        newExpression = newExpression.replace("$r","\\R");
  
        return newExpression;
    }

    /*
    replaceEscapeSequence function process escape sequence
    @escapeSequence specific escape sequence
    @return formated data
    */
    replaceEscapeSequence(escapeSequence)
     {
        var formatedData="";
         switch(escapeSequence)
        {
            case "$N":
            formatedData= "NORMAL ";
            break;

            case "$C":
            formatedData= "CONDENSED ";
            break;
            
            case "$W":
            formatedData= "DOUBLE WIDTH ";
            break;

            case "$H":
            formatedData= "DOUBLE HEIGHT ";
            break;

            case "$D":
            formatedData= "DOUBLE W&H ";
            break;

            case "$Q":
            formatedData= "QUADRUPLE W&H ";
            break;

            case "$c":
            formatedData= "CENTERED ";
            break;

            case "$b":
            formatedData= "BOLD ";
            break;
            
            default:
            break;
         }

         return formatedData;
     }
}
exports.RTConverter = new RTConverter();