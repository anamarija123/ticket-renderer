# Ticket script renderer extenstion README

Ticket script renderer is intended for rendering script language. Support extensions for ticket file are: .ticket,.ini and .tck. Every tag writed in ticket language must be replaced by user context loaded from path writed in ticket file.

## Installing
Ticket extension must be placed in .vscode -> extensions folder

## Ticket file create
File -> new file -> save as (.ticket or .ini or .tck)
File upload: Open file -> find ticket file in file explorer to load in vscode

## Ticket file renderer specific parameters
### Input file path of context
Input file path must be placed inside ticket file on the top under the comment line
*Format: ;TESTFILE testfilepath

### Output file path html
Output file path must be placed inside ticket file on the top under the comment line
*Format: ;OUTPUT outputfilepath

### Bitmap folder path
Bitmap folder path must be placed inside ticket file on the top under the comment line
*Format: ;RESOURCE resourcefilepath

## Release Notes

### 1.0.0

Initial release of ticket script renderer

-----------------------------------------------------------------------------------------------------------

## Working with Ticket Renderer

* `ALT + P` for executing ticket file 
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
