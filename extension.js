
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const getExtensionFromPath = (path) => {
    let a = path.split('/')
    let fileName = a[a.length - 1]
    let b = fileName.split('.')
    return b[b.length - 1]
}

const formatForJsp = (text) => {
    return "\"<c:out value=\"${" + text + "}\" />\""
}

const formatForJs = (text) => {
    return "console.log('" + text + "', " + text + ")"
}

const formatForRb = (text) => {
    return "puts '" + text + "', " + text
}

const supportedFileExtensions = {
    js: formatForJs,
    jsx: formatForJs,
    vue: formatForJs,
    rb: formatForRb,
    jsp: formatForJsp,
    jspf: formatForJsp,
    tag: formatForJsp
}
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
       
        
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        const currentPath = editor.document.uri.path
        const fileExtension = getExtensionFromPath(currentPath)

        if (!supportedFileExtensions[fileExtension]) return;

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        let newText = supportedFileExtensions[fileExtension](text)

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
