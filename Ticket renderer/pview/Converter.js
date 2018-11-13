
//Converter class convert text to print on screen to html 
class Converter 
{
  /*
  Convert function process command in line from ticket file and place it into div element
  @scriptline line from ticket file
  @expressionToPrint data to print on the screen
  */
  convert (scriptline, expressionToPrint)
  {
    const vscode = require('vscode');
    let debugConsole = vscode.debug.activeDebugConsole;
    var lineStyle = "";
    var maxLineLength  =24;
   
    debugConsole.appendLine("Converter.convert script to process: " + scriptline);
    if (scriptline.includes("CENTERED"))
    {
      lineStyle += "CENTERED ";
    }

    if (scriptline.includes("RIGHT"))
    {
      lineStyle += "RIGHT ";
    }

    if (scriptline.includes("BOLD"))
    {
      lineStyle += "BOLD ";
    }

    if (scriptline.includes("BIG"))
    {
      lineStyle += "BIG ";
      maxLineLength = 12;
    }

    if (scriptline.includes("SMALL") || scriptline.includes ("CONDENSED"))
    {
      lineStyle += "SMALL ";
      maxLineLength = 48;
    }

    if (scriptline.includes("INVERTED"))
    {
      lineStyle += "INVERTED ";
    }

    if (scriptline.includes("DOUBLE WIDTH"))
    {
      lineStyle += "DOUBLEWIDTH ";
      maxLineLength = 12;
    }

    if (scriptline.includes("DOUBLE HEIGHT"))
    {
      lineStyle += "DOUBLEHEIGHT ";
      maxLineLength = 24;
    }

    if (scriptline.includes("DOUBLE W&H"))
    {
      lineStyle += "DOUBLEW&H ";
      maxLineLength = 12;
    }

    if (!this.checkLength(expressionToPrint.replace(/\\R/,""), maxLineLength))
    {
      lineStyle += "ERROR ";
    }
        
    if (scriptline.includes("\\R"))
    {
        var expressions=expressionToPrint.split(/\\R/);
        if (expressions!=null && expressions.length >= 2)
        {
          var newTableLine = '<table><tr><th class = "'+ lineStyle +'LEFT"><p>'+ expressions[0].replace(/\"/g, "") + '</p></th><th class ="' + lineStyle + 'RIGHT"> '+ expressions[1].replace(/\"/g, "")  + '</th><tr></table>'
          return newTableLine;
        }
    }
    else if (scriptline.includes("BITMAP"))
    {
      var htmlImg = '<img src="'+ expressionToPrint +'" alt="image" class="CENTER">';
      return htmlImg;
    }
    else if (scriptline.includes("FORM FEED"))
    {
      var htmlFeed = '<div class= "CENTERED"><p>CUT POSITION ---------------------------------------- CUT POSITION</p></div>';
      return htmlFeed;
    }
    else if (scriptline.search(/^\s*FEED\s+\d\s*$/)!=-1)
    {
      var htmlFeed = '<br>';
      return htmlFeed;
    }
    else if (expressionToPrint.search(/\$n/g)!=-1)
    {
        var htmlExpression = '<br>';
        return htmlExpression;
    }
    
    var styledLine = "<div class=\"" + lineStyle + "\"><p>" + expressionToPrint.replace(/\"/g, "") + "</p></div>";
    debugConsole.appendLine("Converter.convert conversion result: " + styledLine);
    
    return styledLine;
  }

  /*
  checkLength function checks length of expression
  @expressionToPrint expression to check length
  @maxLineLength maximal length of line
  */
  checkLength (expressionToPrint, maxLineLength)
  {
    if (expressionToPrint == null)
    {
      return false;
    }
    
    return (expressionToPrint.length <= maxLineLength);
  }
}
exports.converter = new Converter();