
//Formater class process formating
class Formater 
{

    /*format function check tag format
    @value data for format
    @formatTypeSpecifier type of format
    */
    format (value, formatTypeSpecifier)
    {
        const vscode = require('vscode');
        let debugConsole = vscode.debug.activeDebugConsole;

        var formatedData;

        if (value == null)
        {
            throw "Formater.format Value not specified";
        }

        //Check if format is specified
        if (formatTypeSpecifier == null || formatTypeSpecifier.trim() == "")
        {
            return value;
        }

        switch (formatTypeSpecifier)
        {
            case "$:STR":
                formatedData=this.FormatAsSTR(value);
                break;

            case "$:AMT":
                formatedData=this.FormatAsAMT(value);
                break;

            case "$:ANSTR":
                formatedData=this.FormatAsANSTR(value);
                break;

            case "$:ASTR":
                formatedData=this.FormatAsASTR(value);
                break;

            case "$:XSTR":
                formatedData=this.FormatAsXSTR(value);
                break;

            case "$:NSTR":
                formatedData=this.FormatAsNSTR(value);
                break;

            case "$:NWDSTR":
                formatedData=this.FormatAsNWDSTR(value);
                break;

            case "$:INT":
                formatedData=this.FormatAsINT(value);
                break;

            case "$:IPA":
                formatedData=this.FormatAsIPA(value);
                break;

            case "$:PHN":
                formatedData=this.FormatAsPHN(value);
                break;

            case "$:DTE":
                formatedData=this.FormatAsDTE(value);
                break;

            case "$:TME":
                formatedData=this.FormatAsTME(value);
                break;

            case "$:PASS":
                formatedData=this.FormatAsPASS(value);
                break;
           
            default:
                formatedData=this.FormatAsCUSTOM(formatTypeSpecifier, value);
                break;
        }
        return  formatedData;
    }
    FormatAsSTR (value)
    {
        return value;
    }
    /*
    FormatAsAMT function processing AMT type of format
    @value data for format
    */
    FormatAsAMT (value)
    {
        var AMTvalue;

        var regexNumber = /[^0]/;
        var indexOfPositiveNumber = value.search(regexNumber);

        var expression;
        expression = value.substring(indexOfPositiveNumber);

        if (expression.length==1)
        {
        var expressionForPrint = "0,0";
        expressionForPrint += expression;
        AMTvalue = expressionForPrint;
        }
        else if (indexOfPositiveNumber==-1)
        {
        var expressionForPrint = "0,00";
        AMTvalue = expressionForPrint;
        }
        else if (expression.length == 2)
        {
        var expressionForPrint="0,";
        expressionForPrint += expression;
        AMTvalue = expressionForPrint;
        }
        else if (expression.length > 2)
        {
        var size = expression.length-2;
        var expressionForPrint = expression.substring(0, size) + "," + expression.substring(size);
        AMTvalue = expressionForPrint;
        }
        
        return AMTvalue;
    }
    FormatAsANSTR (value)
    {
        return value;
    }
    FormatAsASTR (value)
    {
        return value;
    }
    FormatAsXSTR (value)
    {
        return value;
    }
    FormatAsNSTR (value)
    {
        return value;
    }
    FormatAsNWDSTR (value)
    {
        return value;
    }
    FormatAsINT (value)
    {
        return value;
    }
    FormatAsIPA (value)
    {
        return this.FormatAsCUSTOM("abc.def.ghi.jkl", value);
    }
    FormatAsPHN (value)
    {
        return value;
    }
    FormatAsDTE (value)
    {
        return this.FormatAsCUSTOM("20ab.cd.ef", value);
    }
    FormatAsTME (value)
    {
        return this.FormatAsCUSTOM("ab:cd:ef", value);
    }
    FormatAsPASS (value)
    {
        var newValue="";
        for (var i = 0;i<value.length;++i)
        {
            newValue+=value[i].replace(value[i],"*");
        }
        return newValue;
    }
    /*
    FormatAsCUSTOM function processing format
    @format type of format
    @value data for format
    */
    FormatAsCUSTOM (format, value)
    {
        var smallLetterACharCode = "a".charCodeAt(0);
        var capitalLetterACharCode = "A".charCodeAt(0);
        var formattedValue = "";
        var smallLetterPattern =/[a-z]/;
        var capitalLetterPattern =/[A-Z]/;
        
        for (var i = 0; i < format.length; i++)
        {
            if (smallLetterPattern.test(format[i]))
            {
                var characterIndex = format.charCodeAt(i) - smallLetterACharCode;
                if (characterIndex >= 0 && value.length > characterIndex)
                {
                    formattedValue += value[characterIndex];
                }
                else
                {
                    formattedValue += "?";
                }        
            }
            else if (capitalLetterPattern.test(format[i]))
            {
                var characterIndex = value.length - 1 - (format.charCodeAt(i) - capitalLetterACharCode);
                if (characterIndex >= 0 && value.length > characterIndex)
                {
                    formattedValue += value[characterIndex];
                }
                else
                {
                    formattedValue += "?";
                }        
            }
            else
            {
                formattedValue += format[i];        
            }	
        }
        return formattedValue;
    }
}
exports.format = new Formater();