"use strict";
var overlayColor = '#000';
var overlayOpacity = 0.5;
var repositionOnResize = true;
var verticalOffset = -75;
var horizontalOffset = 0;
var theme = '_blue';
var draggable = true;
var okButton = ' OK ';
var cancelButton = ' Cancel ';
var dialogClass = null;
function jsAlert(message, title, callback) {
    if (!title) {
        title = 'Alert';
    }
    _show(title, message, undefined, 'alert', function (result) {
        if (callback) {
            callback(result);
        }
    });
}
function jsConfirm(message, title, callback) {
    if (!title) {
        title = 'Confirm';
    }
    _show(title, message, undefined, 'confirm', function (result) {
        if (callback) {
            callback(result);
        }
    });
}
function jsCustomConfirm(message, title, okButtonText, cancelButtonText, callback) {
    if (!title) {
        title = 'Confirm';
    }
    if (okButtonText) {
        okButton = " " + okButtonText + " ";
    }
    if (cancelButtonText) {
        cancelButton = " " + cancelButtonText + " ";
    }
    _show(title, message, undefined, 'confirm', function (result) {
        if (callback) {
            callback(result);
        }
        // Once we give Custom Button Name, it will replace for all types.
        // So we need to reset it to stock value!
        okButton = ' OK ';
        cancelButton = ' Cancel ';
    });
}
function jsPrompt(message, value, title, callback) {
    if (!title) {
        title = 'Prompt';
    }
    _show(title, message, value, 'prompt', function (result) {
        if (callback) {
            callback(result);
        }
    });
}
function jsCustomPopup(content, title, okButtonText, cancelButtonText, callback) {
    if (!title) {
        title = 'Custom Popup';
    }
    if (okButtonText) {
        okButton = " " + okButtonText + " ";
    }
    if (cancelButtonText) {
        cancelButton = " " + cancelButton + " ";
    }
    _show(title, content, undefined, 'customPopup', function (result, data) {
        if (callback) {
            callback(result, data);
        }
        okButton = ' OK ';
        cancelButton = ' Cancel ';
    });
}
function _show(title, msg, value, type, callback) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    _hide();
    _overlay('show');
    var popupContainer = document.createElement('div');
    popupContainer.id = 'popup_container';
    var popupTitle = document.createElement('h1');
    popupTitle.id = "popup_title" + theme;
    popupContainer.appendChild(popupTitle);
    var popupContent = document.createElement('div');
    popupContent.id = "popup_content" + theme;
    if (type === 'customPopup') {
        var popupBody = document.createElement('div');
        popupBody.id = 'popup_body';
        popupBody.textContent = msg;
        popupContent.appendChild(popupBody);
    }
    else {
        var popupMessage_1 = document.createElement('div');
        popupMessage_1.id = 'popup_message';
        popupMessage_1.className = 'text-justify';
        popupContent.appendChild(popupMessage_1);
    }
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
    if (typeof dialogClass === 'string') {
        popupContainer.classList.add(dialogClass);
    }
    popupContainer.style.position = 'fixed';
    popupContainer.style.zIndex = '99999';
    popupContainer.style.padding = '0';
    popupContainer.style.margin = '0';
    popupTitle.textContent = title;
    if (typeof type === 'string') {
        popupContent.classList.add(type);
    }
    var popupMessage = document.getElementById('popup_message');
    if (popupMessage instanceof HTMLElement) {
        popupMessage.textContent = msg.replace(/\n/g, '<br />');
    }
    popupContainer.style.minWidth = (popupContainer.clientWidth + 1).toString() + 'px';
    popupContainer.style.maxWidth = (popupContainer.clientWidth + 1).toString() + 'px';
    _reposition();
    _maintainPosition(true);
    switch (type) {
        case 'alert':
            var popupPanelAlert = document.createElement('div');
            popupPanelAlert.id = 'popup_panel';
            var okButtonAlert_1 = document.createElement('input');
            okButtonAlert_1.type = 'button';
            okButtonAlert_1.className = 'btn btn-primary btn-flat btn-sm';
            okButtonAlert_1.value = okButton;
            okButtonAlert_1.id = 'popup_ok';
            popupPanelAlert.appendChild(okButtonAlert_1);
            var iconAlert = document.createElement('div');
            iconAlert.className = 'icon_alert';
            var infoCircle = document.createElement('i');
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
            okButtonAlert_1.addEventListener('click', function () {
                _hide();
                if (callback) {
                    callback(true);
                }
            });
            okButtonAlert_1.focus();
            okButtonAlert_1.addEventListener('keypress', function (e) {
                if (e.code === 'Enter' || e.code === 'Escape') {
                    okButtonAlert_1.dispatchEvent(new Event('click'));
                }
            });
            break;
        case 'confirm':
            var popupPanelConfirm = document.createElement('div');
            popupPanelConfirm.id = 'popup_panel';
            var cancelButtonConfirm_1 = document.createElement('input');
            cancelButtonConfirm_1.id = 'popup_cancel';
            cancelButtonConfirm_1.type = 'button';
            cancelButtonConfirm_1.value = cancelButton;
            cancelButtonConfirm_1.className = 'btn btn-default btn-flat btn-sm';
            popupPanelConfirm.appendChild(cancelButtonConfirm_1);
            popupPanelConfirm.appendChild(document.createTextNode(' '));
            var okButtonConfirm_1 = document.createElement('input');
            okButtonConfirm_1.id = 'popup_ok';
            okButtonConfirm_1.type = 'button';
            okButtonConfirm_1.value = okButton;
            okButtonConfirm_1.className = 'btn btn-primary btn-flat btn-sm';
            popupPanelConfirm.appendChild(okButtonConfirm_1);
            var iconAlertConfirm = document.createElement('div');
            iconAlertConfirm.className = 'icon_alert';
            var questionCircle = document.createElement('i');
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
            okButtonConfirm_1.addEventListener('click', function () {
                _hide();
                if (callback) {
                    callback(true);
                }
            });
            cancelButtonConfirm_1.addEventListener('click', function () {
                _hide();
                if (callback) {
                    callback(false);
                }
            });
            okButtonConfirm_1.focus();
            var buttonCallback = function (e) {
                if (e.code === 'Enter') {
                    okButtonConfirm_1.dispatchEvent(new Event('click'));
                }
                if (e.code === 'Escape') {
                    cancelButtonConfirm_1.dispatchEvent(new Event('click'));
                }
            };
            okButtonConfirm_1.addEventListener('keypress', buttonCallback);
            cancelButtonConfirm_1.addEventListener('keypress', buttonCallback);
            break;
        case 'prompt':
            /*
            $("#popup_message").append('<br /><input type="text" id="popup_prompt" class="form-control input-sm"/><div class="icon_alert"><i class="fas fa-info-circle"></i></div>').after('<div id="popup_panel"><input class="btn btn-default btn-flat btn-sm" type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /> <input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn btn-primary btn-flat btn-sm"/></div>');
            //$("#popup_prompt").width( $("#popup_message").width() ); disable width popup_prompt
            $("#popup_ok").click( function() {
                var val = $("#popup_prompt").val();
                $.alerts._hide();
                if( callback ) callback( val );
            });
            $("#popup_cancel").click( function() {
                $.alerts._hide();
                if( callback ) callback( null );
            });
            $("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
                if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
            });
            if( value ) $("#popup_prompt").val(value);
            $("#popup_prompt").focus().select();
            */
            break;
        case "customPopup":
            /*
            $("#popup_body").after('<div id="popup_panel"><input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="btn btn-default btn-flat btn-sm"/> <input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn btn-primary btn-flat btn-sm"/></div><div class="close button-close"><i class="fas fa-times-circle"><div>');
            //validate form
            var frm = $("#popup_body").find("form");
            $.alerts._validateForm();
            frm.validate();

            $(".button-close").click(function(){
                $.alerts._hide();
                if( callback ) callback(false);
            });

            $("#popup_ok").click(function(e){
                e.preventDefault();
                if(frm.valid()===true){
                    //if form valid
                    if( callback ) callback(true,frm.serialize());
                    $.alerts._hide();
                }
            });

            $("#popup_cancel").click( function() {
                $.alerts._hide();
                if( callback ) callback(false);
            });
            $("#popup_ok").focus();
            $("#popup_ok, #popup_cancel").keypress( function(e) {
                if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
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
    var popupContainer = document.getElementById('popup_container');
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
            var newPopupOverlay = document.createElement('div');
            newPopupOverlay.id = 'popup_overlay';
            newPopupOverlay.style.position = 'absolute';
            newPopupOverlay.style.zIndex = '99998';
            newPopupOverlay.style.top = '0px';
            newPopupOverlay.style.left = '0px';
            newPopupOverlay.style.width = '100%';
            newPopupOverlay.style.height = document.documentElement.clientHeight + "px";
            newPopupOverlay.style.background = overlayColor;
            newPopupOverlay.style.opacity = overlayOpacity.toString();
            document.body.appendChild(newPopupOverlay);
            break;
        case 'hide':
            var popupOverlay = document.getElementById('popup_overlay');
            if (popupOverlay instanceof HTMLElement) {
                (_a = popupOverlay.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(popupOverlay);
            }
            break;
    }
}
function _reposition() {
    var popupContainer = document.getElementById('popup_container');
    if (popupContainer instanceof HTMLElement) {
        var top_1 = ((window.innerHeight / 2) - (popupContainer.offsetHeight / 2)) + verticalOffset;
        var left = ((window.innerWidth / 2) - (popupContainer.offsetWidth / 2)) + horizontalOffset;
        if (top_1 < 0) {
            top_1 = 0;
        }
        if (left < 0) {
            left = 0;
        }
        popupContainer.style.top = top_1 + "px";
        popupContainer.style.left = left + "px";
        var popupOverlay = document.getElementById('popup_overlay');
        if (popupOverlay instanceof HTMLElement) {
            popupOverlay.style.height = (document.documentElement.clientHeight + 1) + "px";
        }
    }
}
function _draggable(elem) {
    var handle = document.getElementById("popup_title" + theme);
    handle === null || handle === void 0 ? void 0 : handle.addEventListener('mousedown', function (ev) {
        var randomNumber = Math.random().toString().replace('.', '');
        var ns = "draggable_" + randomNumber;
        var mm = "mousemove." + ns;
        var mu = "mouseup." + ns;
        var isFixed = (elem.style.position === 'fixed');
        var adjX = 0;
        var adjY = 0;
        var pos = {
            left: elem.offsetLeft,
            top: elem.offsetTop
        };
        if (isFixed) {
            adjX = window.scrollX;
            adjY = window.scrollY;
        }
        var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
        elem.setAttribute("data-" + ns, JSON.stringify({ x: ox, y: oy }));
        var mmCallback = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (isFixed) {
                adjX = window.scrollX;
                adjY = window.scrollY;
            }
            var dataAttr = elem.getAttribute("data-" + ns);
            if (dataAttr) {
                var offset = JSON.parse(dataAttr);
                if (evt instanceof MouseEvent) {
                    elem.style.left = evt.pageX - adjX - offset.x + "px";
                    elem.style.top = evt.pageY - adjY - offset.y + "px";
                }
            }
        };
        window.addEventListener(mm, mmCallback);
        var muCallback = function () {
            window.removeEventListener(mm, mmCallback);
            window.removeEventListener(mu, muCallback);
            elem.removeAttribute("data-" + ns);
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
//# sourceMappingURL=jsAlerts.js.map