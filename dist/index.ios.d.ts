import { IFacebookLoginHandler } from "./index.d";
export declare class FacebookLoginHandler implements IFacebookLoginHandler {
    private isInit;
    private callbackManager;
    private loginManager;
    init(): boolean;
    registerCallback(successCallback: any, cancelCallback: any, failCallback: any): void;
    logInWithPublishPermissions(permissions: string[]): void;
    logInWithReadPermissions(permissions: string[]): void;
}
