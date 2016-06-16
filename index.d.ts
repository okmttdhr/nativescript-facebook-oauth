export interface IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithPublishPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithReadPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
}

export interface LoginResult {
  token: string;
}

export interface LoginError {
  message: string;
  code: number;
  raw: any;
}

export interface IFacebookDelegate {
  applicationDidFinishLaunchingWithOptions: (application: UIApplication, launchOptions: NSDictionary) => boolean;
  applicationOpenURLSourceApplicationAnnotation: (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any) => void;
  applicationDidBecomeActive: () => void;
}

export class FacebookLoginHandler implements IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithPublishPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithReadPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
}

export function connectToFacebookDelegate(): () => void;
