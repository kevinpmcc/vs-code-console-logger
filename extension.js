
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

var getExtensionFromPath = function(path) {
    let a = path.split('/')
    let fileName = a[a.length - 1]
    let b = fileName.split('.')
    return b[b.length - 1]
}

var formatForJSP = function(string) {
    return "\"<c:out value=\"${" + string + "}\" />\""
}

var supportedFileExtensions = ['js', 'jsx', 'vue', 'rb', 'jsp', 'tag', 'jspf']
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.consoleLogger', function () {
        // The console.log('', )code you place here will be executed every time your command is executed
        // Display a message box to the user
       
        
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var currentPath = editor.document.uri.path
        var fileExtension = getExtensionFromPath(currentPath)

        if (!supportedFileExtensions.includes(fileExtension)) return;

        var selection = editor.selection;
        var text = editor.document.getText(selection);

        var newText = "" 

        if (fileExtension === 'js' || fileExtension === 'jsx' || fileExtension === 'vue') {
            newText = "console.log('" + text + "', " + text + ")"
        }

        if (fileExtension === 'rb') {
            newText = "puts '" + text + "', " + text
        }

        if (fileExtension === 'jsp' || fileExtension === 'jspf' || fileExtension === 'tag') {
            newText = formatForJSP(text)
        }

        // Display a message box to the user
           editor.edit(builder => {
            builder.replace(selection, newText)
        })
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}


exports.deactivate = deactivate;
