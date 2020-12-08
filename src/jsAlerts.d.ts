declare const OVERLAY_BACKGROUND_ID = "js-alert-overlay-background";
declare const OVERLAY_ID = "js-alert-overlay";
declare const MESSAGE_ID = "js-alert-message";
declare const BUTTON_OK_ID = "js-alert-ok";
declare const BUTTON_CANCEL_ID = "js-alert-cancel";
declare const overlayColor = "#000";
declare const overlayOpacity = 0.5;
declare const repositionOnResize = true;
declare const verticalOffset = -75;
declare const horizontalOffset = 0;
declare const theme = "blue";
declare const draggable = true;
declare let okButton: string;
declare let cancelButton: string;
declare let dialogClass: string | null;
declare function jsAlert(message: string, title?: string, callback?: (result: Boolean) => void): void;
declare function jsConfirm(message: string, title: string, callback?: (result: Boolean) => void): void;
declare function jsCustomConfirm(message: string, title: string, okButtonText?: string, cancelButtonText?: string, callback?: Function): void;
declare function jsPrompt(message: string, value: string, title: string, callback?: Function): void;
declare function jsCustomPopup(content: string, title: string, okButtonText?: string, cancelButtonText?: string, callback?: Function): void;
declare function _show(title: string, msg: string, value?: string, type?: string, callback?: Function): void;
declare function _hide(): void;
declare function _maintainPosition(status: boolean): void;
declare function _overlay(status: string): void;
declare function _reposition(): void;
declare function _draggable(elem: HTMLElement): void;
//# sourceMappingURL=jsAlerts.d.ts.map