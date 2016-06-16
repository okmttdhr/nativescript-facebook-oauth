import { IFacebookLoginHandler } from "./index.d";
export declare function connectToFacebookDelegate(): void;
export declare class FacebookLoginHandler implements IFacebookLoginHandler {
    private callbackManager;
    private loginManager;
    init(): boolean;
    registerCallback(successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void): void;
    logInWithReadPermissions(permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void): void;
    logInWithPublishPermissions(permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void): void;
}
