const OVERLAY_BACKGROUND_ID = 'js-alert-overlay-background';
const OVERLAY_ID = 'js-alert-overlay';
const MESSAGE_ID = 'js-alert-message';
const BUTTON_OK_ID = 'js-alert-ok';
const BUTTON_CANCEL_ID = 'js-alert-cancel';

const overlayColor = '#000';
const overlayOpacity = 0.5;
const repositionOnResize = true;
const verticalOffset = -75;
const horizontalOffset = 0;
const theme = 'blue';
const draggable = true;
let okButton = ' OK ';
let cancelButton = ' Cancel ';
let dialogClass: string|null = null;

function jsAlert(message: string, title?: string, callback?: (result: Boolean) => void) {
    if (!title) {
        title = 'Alert';
    }
    _show(title, message, undefined, 'alert', (result: Boolean) => {
        if (callback) {
            callback(result);
        }
    });
}

function jsConfirm(message: string, title: string, callback?: (result: Boolean) => void) {
    if (!title) {
        title = 'Confirm';
    }
    _show(title, message, undefined, 'confirm', (result: Boolean) => {
        if (callback)  {
            callback(result);
        }
    });
}

function jsCustomConfirm(message: string, title: string, okButtonText?: string, cancelButtonText?: string, callback?: Function) {
    if (!title)  {
        title = 'Confirm';
    }
    if (okButtonText) {
        okButton = ` ${okButtonText} `;
    }
    if (cancelButtonText) {
        cancelButton = ` ${cancelButtonText} `;
    }
    _show(title, message, undefined, 'confirm', (result: Boolean) => {
        if (callback) {
            callback(result);
        }
        // Once we give Custom Button Name, it will replace for all types.
        // So we need to reset it to stock value!
        okButton = ' OK ';
        cancelButton = ' Cancel ';
    });
}

function jsPrompt(message: string, value: string, title: string, callback?: Function) {
    if (!title) {
        title = 'Prompt';
    }
    _show(title, message, value, 'prompt', (result: Boolean) => {
        if (callback) {
            callback(result);
        }
    });
}

function jsCustomPopup(content: string, title: string, okButtonText?: string, cancelButtonText?: string, callback?: Function) {
    if (!title) {
        title = 'Custom Popup';
    }
    if (okButtonText) {
        okButton = ` ${okButtonText} `;
    }
    if (cancelButtonText) {
        cancelButton = ` ${cancelButton} `;
    }
    _show(title, content, undefined, 'customPopup', (result: Boolean, data: string) => {
        if (callback) {
            callback(result, data);
        }
        okButton = ' OK ';
        cancelButton = ' Cancel ';
    });
}

function _show(title: string, msg: string, value?: string, type?: string, callback?: Function) {

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
    } else {
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
        popupMessage.textContent = msg.replace(/\n/g, '<br />');
    }

    popupContainer.style.minWidth = (popupContainer.clientWidth + 1).toString() + 'px';
    popupContainer.style.maxWidth = (popupContainer.clientWidth + 1).toString() + 'px';

    _reposition();
    _maintainPosition(true);

    switch(type) {
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
                    popupMessage.parentElement?.insertBefore(popupPanelAlert, popupMessage.nextSibling);
                    if (popupPanelAlert.nextSibling) {
                        popupPanelAlert.parentElement?.insertBefore(iconAlert, popupPanelAlert.nextSibling);
                    } else {
                        popupMessage.parentElement?.appendChild(iconAlert);
                    }
                } else {
                    popupMessage.parentElement?.appendChild(popupPanelAlert);
                    popupMessage.parentElement?.appendChild(iconAlert);
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
                    popupMessage.parentElement?.insertBefore(popupPanelConfirm, popupMessage.nextSibling);
                    if (popupPanelConfirm.nextSibling) {
                        popupPanelConfirm.parentElement?.insertBefore(iconAlertConfirm, popupPanelConfirm.nextSibling);
                    } else {
                        popupMessage.parentElement?.appendChild(iconAlertConfirm);
                    }
                } else {
                    popupMessage.parentElement?.appendChild(popupPanelConfirm);
                    popupMessage.parentElement?.appendChild(iconAlertConfirm);
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

            const buttonCallback = (e: KeyboardEvent) => {
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
            /*
            $("#" + MESSAGE_ID).append('<br /><input type="text" id="popup_prompt" class="form-control input-sm"/><div class="icon-alert"><i class="fas fa-info-circle"></i></div>').after('<div class="js-alert-panel"><input class="btn btn-default btn-flat btn-sm" type="button" value="' + $.alerts.cancelButton + '" id="' + BUTTON_CANCEL_ID + '" /> <input type="button" value="' + $.alerts.okButton + '" id="' + BUTTON_OK_ID + '" class="btn btn-primary btn-flat btn-sm"/></div>');
            //$("#popup_prompt").width( $("#" + MESSAGE_ID).width() ); disable width popup_prompt
            $("#" + BUTTON_OK_ID).click( function() {
                var val = $("#popup_prompt").val();
                $.alerts._hide();
                if( callback ) callback( val );
            });
            $("#" + BUTTON_CANCEL_ID).click( function() {
                $.alerts._hide();
                if( callback ) callback( null );
            });
            $("#popup_prompt, #" + BUTTON_OK_ID + ", #" + BUTTON_CANCEL_ID).keypress( function(e) {
                if( e.keyCode == 13 ) $("#" + BUTTON_OK_ID).trigger('click');
                if( e.keyCode == 27 ) $("#" + BUTTON_CANCEL_ID).trigger('click');
            });
            if( value ) $("#popup_prompt").val(value);
            $("#popup_prompt").focus().select();
            */
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
    const popupContainer = document.getElementById(OVERLAY_ID);
    if (popupContainer instanceof HTMLElement) {
        popupContainer.parentElement?.removeChild(popupContainer);
    }
    _overlay('hide');
    _maintainPosition(false);
}

function _maintainPosition(status: boolean) {
    if (repositionOnResize) {
        switch(status) {
            case true:
                window.addEventListener('resize', _reposition);
                break;
            
            case false:
                window.removeEventListener('resize', _reposition);
                break;
        }
    }
}

function _overlay(status: string) {
    switch(status) {
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
                popupOverlay.parentElement?.removeChild(popupOverlay);
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

function _draggable(elem: HTMLElement) {
    const handle = document.getElementById(`popup_title${theme}`);

    handle?.addEventListener('mousedown', ev => {
        const randomNumber = Math.random().toString().replace('.', '');
        const ns = `draggable_${randomNumber}`;
        const mm = `mousemove.${ns}`;
        const mu = `mouseup.${ns}`;
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
        elem.setAttribute(`data-${ns}`, JSON.stringify({ x : ox, y: oy }));

        const mmCallback = (evt: Event) => {
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
        };
        window.addEventListener(mm, mmCallback);
        const muCallback = () => {
            window.removeEventListener(mm, mmCallback);
            window.removeEventListener(mu, muCallback);
            elem.removeAttribute(`data-${ns}`);
        };
        window.addEventListener(mu, muCallback);
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

export { jsAlert, jsConfirm };
