declare type ShowOptions = {
    maxlength?: number;
};
export declare function jsAlert(message: string, title?: string, callback?: (result: Boolean) => void): void;
export declare function jsConfirm(message: string, title: string, callback?: (result: Boolean) => void): void;
export declare function jsPrompt(message: string, value: string, title: string, callback?: (result: string | null) => void, opts?: ShowOptions): void;
export {};
