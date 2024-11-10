import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { Colors } from './resources/colors/index';

async function loadColorFile(context: vscode.ExtensionContext, color: string): Promise<string> {
	const filePath = path.join(context.extensionPath, 'src/resources/colors', `${color}.ts`);
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				reject(`Error reading file for ${color}: ${err.message}`);
			} else {
				resolve(data);
			}
		});
	});
}

async function generateColor(directory: any, filename: string, extension: string, color: string) {
	const projectDir = vscode.workspace.workspaceFolders?.[0];

	if (!projectDir) {
		vscode.window.showErrorMessage('No workspace folder found.');
	}

	// @ts-ignore
	const desiredDir = path.join(projectDir.uri.fsPath, directory);

	vscode.window.showInformationMessage(desiredDir);
	const fullPath = path.join(desiredDir, `${filename.toLowerCase()}${extension.toLowerCase()}`);

	if (!fs.existsSync(desiredDir)) {
		vscode.window.showErrorMessage('No workspace folder found.', `${desiredDir}`);
	}

	// find the directory and generate the file according to it color of selection
	switch (color) {
		case 'Black':
			fs.writeFileSync(fullPath, `${Colors.black}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Blue':
			fs.writeFileSync(fullPath, `${Colors.blue}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Browns':
			fs.writeFileSync(fullPath, `${Colors.brown}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Green':
			fs.writeFileSync(fullPath, `${Colors.green}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Orange':
			fs.writeFileSync(fullPath, `${Colors.orange}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Pink':
			fs.writeFileSync(fullPath, `${Colors.pink}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Purple':
			fs.writeFileSync(fullPath, `${Colors.purple}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Red':
			fs.writeFileSync(fullPath, `${Colors.red}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'White':
			fs.writeFileSync(fullPath, `${Colors.white}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		case 'Yellow':
			fs.writeFileSync(fullPath, `${Colors.yellow}`, { flag: 'a' });
			vscode.window.showInformationMessage(`${color.toString()} palette Generated Successfully `);
			break;
		default:
			break;
	}


}

export function activate(context: vscode.ExtensionContext) {

	// Show message of Activating extension
	vscode.window.showInformationMessage('Activating Color Gen-File Extension...');
	setTimeout(() => {
		vscode.window.showInformationMessage('Congratulations, your extension "Color Gen-File" is now active!');
	}, 3000);

	// To generate colors
	const generatecolors = vscode.commands.registerCommand('color-genfile-vscode.generateColors', async () => {

		// show input box for directory to save the genrated file
		const directory = await vscode.window.showInputBox({
			prompt: 'Where do you want to save the file',
			placeHolder: 'e.g., src/assets'
		});

		if (!directory) {
			vscode.window.showErrorMessage('Directory is needed');
			return;
		}
		vscode.window.showInformationMessage(`File will be saved in the ${directory} Folder`);

		// Create a filename
		const filename = await vscode.window.showInputBox({
			prompt: 'Give your file a name.',
			placeHolder: 'e.g., colors',
		});

		if (!filename) {
			vscode.window.showErrorMessage('Filename is needed in other not to override your default name');
			return;
		}

		// Selection of color platte
		const selectedColor = await vscode.window.showQuickPick(
			['Black', 'Blue', 'Brown', 'Green', 'Orange', 'Red', 'White', 'Yellow'],
			{
				placeHolder: 'Select the color platte you want to generate',
				canPickMany: false
			}
		);

		if (!selectedColor) {
			vscode.window.showErrorMessage('A color needs to be selected');
			return;
		}


		// choosing of file exxtention .css or .scss
		const exxtention = await vscode.window.showQuickPick(
			['.Css', '.Scss'],
			{ placeHolder: 'Select the extension you would like to use' }
		);

		if (!exxtention) {
			vscode.window.showErrorMessage('You need to choose a file extension to continue');
			return;
		}
		vscode.window.showInformationMessage(`File extension will be ${filename}${exxtention.toLowerCase()} in ${directory} Folder`);

		loadColorFile(context, selectedColor);
		vscode.window.showInformationMessage('Generating your desired color palette');


		setTimeout(() => {
			generateColor(directory, filename, exxtention, selectedColor);
		}, 3000);




	});

	// to generate variables file
	const generatevariables = vscode.commands.registerCommand('color-genfile-vscode.generateVariables', () => {
		vscode.window.showInformationMessage('Hello Variables');
	});

	context.subscriptions.push(generatecolors);
	context.subscriptions.push(generatevariables);
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage("Don't want to see you go");
}


// /home/operaconga/Documents/My Personal Folder/Vscode gen tests/src/colors
