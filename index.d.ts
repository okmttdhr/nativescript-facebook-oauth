export interface IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) => void;
  logInWithPublishPermissions: (permissions: string[], successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) => void;
  logInWithReadPermissions: (permissions: string[], successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) => void;
}

export interface FacebookLoginResult {
  token: string;
}

export interface FacebookLoginError {
  message: string;
  code: number;
  raw: any;
}

interface IFBDelegate {
  applicationDidFinishLaunchingWithOptions: () => boolean;
  applicationOpenURLSourceApplicationAnnotation: () => void;
  applicationDidBecomeActive: () => void;
}

declare module "nativescript-facebook-oauth" {
  export const FacebookLoginHandler: IFacebookLoginHandler;
  export const FBDelegate: IFBDelegate;
}
