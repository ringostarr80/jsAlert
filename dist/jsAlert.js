"use strict";
if (typeof window["exports"] === "undefined") {
	window["exports"] = {};
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsPrompt = exports.jsConfirm = exports.jsAlert = void 0;
const OVERLAY_BACKGROUND_ID = 'js-alert-overlay-background';
const OVERLAY_ID = 'js-alert-overlay';
const MESSAGE_ID = 'js-alert-message';
const BUTTON_OK_ID = 'js-alert-ok';
const BUTTON_CANCEL_ID = 'js-alert-cancel';
const repositionOnResize = true;
const verticalOffset = -75;
const horizontalOffset = 0;
const theme = 'blue';
const draggable = true;
let okButton = ' OK ';
let cancelButton = ' Cancel ';
let dialogClass = null;
function jsAlert(message, title, callback) {
    if (!title) {
        title = 'Alert';
    }
    _show(title, message, undefined, 'alert', (result) => {
        if (callback) {
            callback(result);
        }
    });
}
exports.jsAlert = jsAlert;
function jsConfirm(message, title, callback) {
    if (!title) {
        title = 'Confirm';
    }
    _show(title, message, undefined, 'confirm', (result) => {
        if (callback) {
            callback(result);
        }
    });
}
exports.jsConfirm = jsConfirm;
function jsCustomConfirm(message, title, okButtonText, cancelButtonText, callback) {
    if (!title) {
        title = 'Confirm';
    }
    if (okButtonText) {
        okButton = ` ${okButtonText} `;
    }
    if (cancelButtonText) {
        cancelButton = ` ${cancelButtonText} `;
    }
    _show(title, message, undefined, 'confirm', (result) => {
        if (callback) {
            callback(result);
        }
        // Once we give Custom Button Name, it will replace for all types.
        // So we need to reset it to stock value!
        okButton = ' OK ';
        cancelButton = ' Cancel ';
    });
}
function jsPrompt(message, value, title, callback, opts) {
    if (!title) {
        title = 'Prompt';
    }
    _show(title, message, value, 'prompt', (result) => {
        if (callback && (result === null || typeof result === 'string')) {
            callback(result);
        }
    }, opts);
}
exports.jsPrompt = jsPrompt;
function jsCustomPopup(content, title, okButtonText, cancelButtonText, callback) {
    if (!title) {
        title = 'Custom Popup';
    }
    if (okButtonText) {
        okButton = ` ${okButtonText} `;
    }
    if (cancelButtonText) {
        cancelButton = ` ${cancelButton} `;
    }
    _show(title, content, undefined, 'customPopup', (result, data) => {
        if (callback) {
            callback(result, data);
        }
        okButton = ' OK ';
        cancelButton = ' Cancel ';
    });
}
function _show(title, msg, value, type, callback, opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    _hide();
    _overlay('show');
    const popupContainer = document.createElement('div');
    popupContainer.id = OVERLAY_ID;
    const popupTitle = document.createElement('h1');
    popupTitle.className = `js-alert-theme-${theme}`;
    popupContainer.appendChild(popupTitle);
    const popupContent = document.createElement('div');
    popupContent.className = 'js-alert-content';
    if (type === 'customPopup') {
        const popupBody = document.createElement('div');
        popupBody.id = 'popup_body';
        popupBody.textContent = msg;
        popupContent.appendChild(popupBody);
    }
    else {
        const popupMessage = document.createElement('div');
        popupMessage.id = MESSAGE_ID;
        popupContent.appendChild(popupMessage);
    }
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
    if (typeof dialogClass === 'string') {
        popupContainer.classList.add(dialogClass);
    }
    popupTitle.textContent = title;
    if (typeof type === 'string') {
        popupContent.classList.add(type);
    }
    const popupMessage = document.getElementById(MESSAGE_ID);
    if (popupMessage instanceof HTMLElement) {
        popupMessage.innerText = msg;
    }
    popupContainer.style.minWidth = (popupContainer.clientWidth + 1).toString() + 'px';
    popupContainer.style.maxWidth = (popupContainer.clientWidth + 1).toString() + 'px';
    _reposition();
    _maintainPosition(true);
    switch (type) {
        case 'alert':
            const popupPanelAlert = document.createElement('div');
            popupPanelAlert.className = 'js-alert-panel';
            const okButtonAlert = document.createElement('input');
            okButtonAlert.type = 'button';
            okButtonAlert.className = 'btn btn-primary btn-flat btn-sm';
            okButtonAlert.value = okButton;
            okButtonAlert.id = BUTTON_OK_ID;
            popupPanelAlert.appendChild(okButtonAlert);
            const iconAlert = document.createElement('div');
            iconAlert.className = 'icon-alert';
            const infoCircle = document.createElement('i');
            infoCircle.className = 'fas fa-info-circle';
            iconAlert.appendChild(infoCircle);
            if (popupMessage instanceof HTMLElement) {
                if (popupMessage.nextSibling) {
                    (_a = popupMessage.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(popupPanelAlert, popupMessage.nextSibling);
                    if (popupPanelAlert.nextSibling) {
                        (_b = popupPanelAlert.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(iconAlert, popupPanelAlert.nextSibling);
                    }
                    else {
                        (_c = popupMessage.parentElement) === null || _c === void 0 ? void 0 : _c.appendChild(iconAlert);
                    }
                }
                else {
                    (_d = popupMessage.parentElement) === null || _d === void 0 ? void 0 : _d.appendChild(popupPanelAlert);
                    (_e = popupMessage.parentElement) === null || _e === void 0 ? void 0 : _e.appendChild(iconAlert);
                }
            }
            okButtonAlert.addEventListener('click', () => {
                _hide();
                if (callback) {
                    callback(true);
                }
            });
            okButtonAlert.focus();
            okButtonAlert.addEventListener('keypress', e => {
                if (e.code === 'Enter' || e.code === 'Escape') {
                    okButtonAlert.dispatchEvent(new Event('click'));
                }
            });
            break;
        case 'confirm':
            const popupPanelConfirm = document.createElement('div');
            popupPanelConfirm.className = 'js-alert-panel';
            const cancelButtonConfirm = document.createElement('input');
            cancelButtonConfirm.id = BUTTON_CANCEL_ID;
            cancelButtonConfirm.type = 'button';
            cancelButtonConfirm.value = cancelButton;
            cancelButtonConfirm.className = 'btn btn-default btn-flat btn-sm';
            popupPanelConfirm.appendChild(cancelButtonConfirm);
            popupPanelConfirm.appendChild(document.createTextNode(' '));
            const okButtonConfirm = document.createElement('input');
            okButtonConfirm.id = BUTTON_OK_ID;
            okButtonConfirm.type = 'button';
            okButtonConfirm.value = okButton;
            okButtonConfirm.className = 'btn btn-primary btn-flat btn-sm';
            popupPanelConfirm.appendChild(okButtonConfirm);
            const iconAlertConfirm = document.createElement('div');
            iconAlertConfirm.className = 'icon-alert';
            const questionCircle = document.createElement('i');
            questionCircle.className = 'fas fa-question-circle';
            iconAlertConfirm.appendChild(questionCircle);
            if (popupMessage instanceof HTMLElement) {
                if (popupMessage.nextSibling) {
                    (_f = popupMessage.parentElement) === null || _f === void 0 ? void 0 : _f.insertBefore(popupPanelConfirm, popupMessage.nextSibling);
                    if (popupPanelConfirm.nextSibling) {
                        (_g = popupPanelConfirm.parentElement) === null || _g === void 0 ? void 0 : _g.insertBefore(iconAlertConfirm, popupPanelConfirm.nextSibling);
                    }
                    else {
                        (_h = popupMessage.parentElement) === null || _h === void 0 ? void 0 : _h.appendChild(iconAlertConfirm);
                    }
                }
                else {
                    (_j = popupMessage.parentElement) === null || _j === void 0 ? void 0 : _j.appendChild(popupPanelConfirm);
                    (_k = popupMessage.parentElement) === null || _k === void 0 ? void 0 : _k.appendChild(iconAlertConfirm);
                }
            }
            okButtonConfirm.addEventListener('click', () => {
                _hide();
                if (callback) {
                    callback(true);
                }
            });
            cancelButtonConfirm.addEventListener('click', () => {
                _hide();
                if (callback) {
                    callback(false);
                }
            });
            okButtonConfirm.focus();
            const buttonCallback = (e) => {
                if (e.code === 'Enter') {
                    okButtonConfirm.dispatchEvent(new Event('click'));
                }
                if (e.code === 'Escape') {
                    cancelButtonConfirm.dispatchEvent(new Event('click'));
                }
            };
            okButtonConfirm.addEventListener('keypress', buttonCallback);
            cancelButtonConfirm.addEventListener('keypress', buttonCallback);
            break;
        case 'prompt':
            if (popupMessage instanceof HTMLElement) {
                const brElement = document.createElement('br');
                popupMessage.appendChild(brElement);
                const promptInput = document.createElement('input');
                promptInput.id = 'popup_prompt';
                promptInput.type = 'text';
                promptInput.className = 'form-control input-sm';
                if ((opts === null || opts === void 0 ? void 0 : opts.maxlength) && (opts === null || opts === void 0 ? void 0 : opts.maxlength) > 0) {
                    promptInput.maxLength = opts === null || opts === void 0 ? void 0 : opts.maxlength;
                }
                popupMessage.appendChild(promptInput);
                const alertIconElement = document.createElement('div');
                alertIconElement.className = 'icon-alert';
                const infoCircle = document.createElement('i');
                infoCircle.className = 'fas fa-info-circle';
                alertIconElement.appendChild(infoCircle);
                popupMessage.appendChild(alertIconElement);
                const alertPanel = document.createElement('div');
                alertPanel.className = 'js-alert-panel';
                const cancelButtonElement = document.createElement('input');
                cancelButtonElement.type = 'button';
                cancelButtonElement.value = cancelButton;
                cancelButtonElement.id = BUTTON_CANCEL_ID;
                cancelButtonElement.className = 'btn btn-default btn-flat btn-sm';
                const okButtonElement = document.createElement('input');
                okButtonElement.type = 'button';
                okButtonElement.value = okButton;
                okButtonElement.id = BUTTON_OK_ID;
                okButtonElement.className = 'btn btn-primary btn-flat btn-sm';
                alertPanel.appendChild(cancelButtonElement);
                alertPanel.appendChild(document.createTextNode(' '));
                alertPanel.appendChild(okButtonElement);
                if (popupMessage.nextSibling) {
                    (_l = popupMessage.parentNode) === null || _l === void 0 ? void 0 : _l.insertBefore(alertPanel, popupMessage.nextSibling);
                }
                else {
                    popupMessage.appendChild(alertPanel);
                }
            }
            const popupPromptElement = document.getElementById('popup_prompt');
            const okButtonElement = document.getElementById(BUTTON_OK_ID);
            if (okButtonElement instanceof HTMLElement) {
                okButtonElement.addEventListener('click', () => {
                    const popupPromptElement = document.getElementById('popup_prompt');
                    if (popupPromptElement instanceof HTMLInputElement || popupPromptElement instanceof HTMLTextAreaElement) {
                        _hide();
                        if (callback) {
                            callback(popupPromptElement.value);
                        }
                    }
                });
            }
            const cancelButtonElement = document.getElementById(BUTTON_CANCEL_ID);
            if (cancelButtonElement instanceof HTMLElement) {
                cancelButtonElement.addEventListener('click', () => {
                    _hide();
                    if (callback) {
                        callback(null);
                    }
                });
            }
            const ids = ['popup_prompt', BUTTON_OK_ID, BUTTON_CANCEL_ID];
            for (const id of ids) {
                const idElement = document.getElementById(id);
                if (idElement instanceof HTMLElement) {
                    idElement.addEventListener('keypress', e => {
                        if (e.code === 'Enter') {
                            const okButtonElement = document.getElementById(BUTTON_OK_ID);
                            if (okButtonElement instanceof HTMLElement) {
                                okButtonElement.dispatchEvent(new Event('click'));
                            }
                        }
                        if (e.code === 'Escape') {
                            const cancelButtonElement = document.getElementById(BUTTON_CANCEL_ID);
                            if (cancelButtonElement instanceof HTMLElement) {
                                cancelButtonElement.dispatchEvent(new Event('click'));
                            }
                        }
                    });
                }
            }
            if (popupPromptElement instanceof HTMLInputElement) {
                if (value) {
                    popupPromptElement.value = value;
                }
                popupPromptElement.focus();
                popupPromptElement.dispatchEvent(new Event('select'));
            }
            break;
        case "customPopup":
            /*
            $("#popup_body").after('<div class="js-alert-panel"><input type="button" value="' + $.alerts.cancelButton + '" id="' + BUTTON_CANCEL_ID + '" class="btn btn-default btn-flat btn-sm"/> <input type="button" value="' + $.alerts.okButton + '" id="' + BUTTON_OK_ID + '" class="btn btn-primary btn-flat btn-sm"/></div><div class="close button-close"><i class="fas fa-times-circle"><div>');
            //validate form
            var frm = $("#popup_body").find("form");
            $.alerts._validateForm();
            frm.validate();

            $(".button-close").click(function(){
                $.alerts._hide();
                if( callback ) callback(false);
            });

            $("#" + BUTTON_OK_ID).click(function(e){
                e.preventDefault();
                if(frm.valid()===true){
                    //if form valid
                    if( callback ) callback(true,frm.serialize());
                    $.alerts._hide();
                }
            });

            $("#" + BUTTON_CACNEL_ID).click( function() {
                $.alerts._hide();
                if( callback ) callback(false);
            });
            $("#" + BUTTON_OK_ID).focus();
            $("#" + BUTTON_OK_ID + ", #" + BUTTON_CANCEL_ID).keypress( function(e) {
                if( e.keyCode == 13 ) $("#" + BUTTON_OK_ID).trigger('click');
                if( e.keyCode == 27 ) $("#" + BUTTON_CANCEL_ID).trigger('click');
            });
            */
            break;
    }
    if (draggable) {
        _draggable(popupContainer);
        popupTitle.style.cursor = 'move';
    }
}
function _hide() {
    var _a;
    const popupContainer = document.getElementById(OVERLAY_ID);
    if (popupContainer instanceof HTMLElement) {
        (_a = popupContainer.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(popupContainer);
    }
    _overlay('hide');
    _maintainPosition(false);
}
function _maintainPosition(status) {
    if (repositionOnResize) {
        switch (status) {
            case true:
                window.addEventListener('resize', _reposition);
                break;
            case false:
                window.removeEventListener('resize', _reposition);
                break;
        }
    }
}
function _overlay(status) {
    var _a;
    switch (status) {
        case 'show':
            _overlay('hide');
            const newPopupOverlay = document.createElement('div');
            newPopupOverlay.id = OVERLAY_BACKGROUND_ID;
            newPopupOverlay.style.height = `${document.documentElement.clientHeight}px`;
            document.body.appendChild(newPopupOverlay);
            break;
        case 'hide':
            const popupOverlay = document.getElementById(OVERLAY_BACKGROUND_ID);
            if (popupOverlay instanceof HTMLElement) {
                (_a = popupOverlay.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(popupOverlay);
            }
            break;
    }
}
function _reposition() {
    const popupContainer = document.getElementById(OVERLAY_ID);
    if (popupContainer instanceof HTMLElement) {
        let top = ((window.innerHeight / 2) - (popupContainer.offsetHeight / 2)) + verticalOffset;
        let left = ((window.innerWidth / 2) - (popupContainer.offsetWidth / 2)) + horizontalOffset;
        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }
        popupContainer.style.top = `${top}px`;
        popupContainer.style.left = `${left}px`;
        const popupOverlay = document.getElementById(OVERLAY_BACKGROUND_ID);
        if (popupOverlay instanceof HTMLElement) {
            popupOverlay.style.height = `${document.documentElement.clientHeight + 1}px`;
        }
    }
}
function _draggable(elem) {
    const handle = elem.querySelector('h1');
    handle === null || handle === void 0 ? void 0 : handle.addEventListener('mousedown', ev => {
        const randomNumber = Math.random().toString().replace('.', '');
        const ns = `draggable-${randomNumber}`;
        const isFixed = (elem.style.position === 'fixed');
        let adjX = 0;
        let adjY = 0;
        const pos = {
            left: elem.offsetLeft,
            top: elem.offsetTop
        };
        if (isFixed) {
            adjX = window.scrollX;
            adjY = window.scrollY;
        }
        const ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
        elem.setAttribute(`data-${ns}`, JSON.stringify({ x: ox, y: oy }));
        const mmCallback = (evt) => {
            var _a;
            evt.preventDefault();
            evt.stopPropagation();
            if (isFixed) {
                adjX = window.scrollX;
                adjY = window.scrollY;
            }
            const dataAttr = elem.getAttribute(`data-${ns}`);
            if (dataAttr) {
                const offset = JSON.parse(dataAttr);
                if (evt instanceof MouseEvent) {
                    elem.style.left = `${evt.pageX - adjX - offset.x}px`;
                    elem.style.top = `${evt.pageY - adjY - offset.y}px`;
                }
            }
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        };
        window.addEventListener('mousemove', mmCallback);
        const muCallback = () => {
            var _a;
            window.removeEventListener('mousemove', mmCallback);
            window.removeEventListener('mouseup', muCallback);
            elem.removeAttribute(`data-${ns}`);
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        };
        window.addEventListener('mouseup', muCallback);
    });
}
/*
function _validateForm() {
    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
  });
}
*/
//# sourceMappingURL=jsAlert.js.map