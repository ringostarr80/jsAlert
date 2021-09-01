import { jsAlert, jsConfirm, jsPrompt } from './src/jsAlerts.js';

document.addEventListener('DOMContentLoaded', () => {
	const showAlertButton = document.getElementById('show-alert');
	if (showAlertButton instanceof HTMLElement) {
		showAlertButton.addEventListener('click', () => {
			jsAlert('Hello World\n2. line', 'Alert Dialog', result => {
				console.log(result);
			});
		});
	}

	const showConfirmButton = document.getElementById('show-confirm')
	if (showConfirmButton instanceof HTMLElement) {
		showConfirmButton.addEventListener('click', () => {
			jsConfirm('Hello World\n2. line', 'Confirm Dialog', result => {
				console.log(result);
			});
		});
	}

	const showPromptButton = document.getElementById('show-prompt');
	if (showPromptButton instanceof HTMLElement) {
		showPromptButton.addEventListener('click', () => {
			jsPrompt('Hello World\n2. line', 'Prompt Value', 'Title', result => {
				console.log(result);
			});
		});
	}
});
