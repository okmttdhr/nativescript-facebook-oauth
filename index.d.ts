export interface IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: any, cancelCallback: any, failCallback: any) => void;
  logInWithPublishPermissions: (permissions: NSArray) => void;
  logInWithReadPermissions: (permissions: NSArray) => void;
}

export interface FacebookLoginResult {
  token: NSString;
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
