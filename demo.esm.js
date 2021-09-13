import { jsAlert, jsConfirm, jsPrompt } from './dist/jsAlert.esm.js';

document.addEventListener('DOMContentLoaded', function () {
    const showAlertButton = document.getElementById('show-alert');
    if (showAlertButton instanceof HTMLElement) {
        showAlertButton.addEventListener('click', function () {
            jsAlert('Hello World\n2. line', 'Alert Dialog', function (result) {
                console.log(result);
            });
        });
    }
    const showConfirmButton = document.getElementById('show-confirm');
    if (showConfirmButton instanceof HTMLElement) {
        showConfirmButton.addEventListener('click', function () {
            jsConfirm('Hello World\n2. line', 'Confirm Dialog', function (result) {
                console.log(result);
            });
        });
    }
    const showPromptButton = document.getElementById('show-prompt');
    if (showPromptButton instanceof HTMLElement) {
        showPromptButton.addEventListener('click', function () {
            jsPrompt('Hello World\n2. line', 'Prompt Value', 'Title', function (result) {
                console.log(result);
            }, { maxlength: 20 });
        });
    }
});
