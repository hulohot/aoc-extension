// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "aoc-extension" is now active!');


  // Activate the "createAdventOfCodeDay" command
  let createAdventOfCodeDay = vscode.commands.registerCommand(
    "aoc-extension.createAdventOfCodeDay",
    runCommand
  );

  context.subscriptions.push(createAdventOfCodeDay);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function createAdventOfCodeDayCommand(folderName: string) {
  // Get the current workspace folder
  const workspaceFolder = vscode.workspace.workspaceFolders![0];

  // Get the path to the current workspace folder
  const workspacePath = workspaceFolder.uri.fsPath;

  // Create the full path to the new folder
  const fullFolderPath = `${workspacePath}/${folderName}`;

  // Create a new folder with the specified name
  vscode.workspace.fs.createDirectory(vscode.Uri.file(fullFolderPath));

  console.log(`Created folder ${folderName}...`);

  // Create two new files inside the folder
  vscode.workspace.fs.writeFile(
    vscode.Uri.file(`${fullFolderPath}/${folderName}-p1.py`),
    new Uint8Array()
  );

  console.log(`Created file ${folderName}-p1.py...`);

  vscode.workspace.fs.writeFile(
    vscode.Uri.file(`${fullFolderPath}/${folderName}-p2.py`),
    new Uint8Array()
  );

  console.log(`Created file ${folderName}-p2.py...`);
}

// Prompt the user for the folder name when the command is called
async function runCommand() {
  const folderName: string | undefined = await vscode.window.showInputBox()!;
  if (folderName === undefined) {
    return;
  }

  console.log(`Creating folder ${folderName}...`);

  if (folderName) {
    createAdventOfCodeDayCommand(folderName);
  }
}
