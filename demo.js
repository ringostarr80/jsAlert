import { jsAlert, jsConfirm, jsPrompt } from './src/jsAlerts.js';
document.addEventListener('DOMContentLoaded', function () {
    var showAlertButton = document.getElementById('show-alert');
    if (showAlertButton instanceof HTMLElement) {
        showAlertButton.addEventListener('click', function () {
            jsAlert('Hello World', 'Alert Dialog', function (result) {
                console.log(result);
            });
        });
    }
    var showConfirmButton = document.getElementById('show-confirm');
    if (showConfirmButton instanceof HTMLElement) {
        showConfirmButton.addEventListener('click', function () {
            jsConfirm('Hello World', 'Confirm Dialog', function (result) {
                console.log(result);
            });
        });
    }
    var showPromptButton = document.getElementById('show-prompt');
    if (showPromptButton instanceof HTMLElement) {
        showPromptButton.addEventListener('click', function () {
            jsPrompt('Hello World', 'Prompt Value', 'Title', function (result) {
                console.log(result);
            });
        });
    }
});
//# sourceMappingURL=demo.js.map