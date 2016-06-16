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

export interface IFacebookDelegate {
  applicationDidFinishLaunchingWithOptions: (application: UIApplication, launchOptions: NSDictionary) => boolean;
  applicationOpenURLSourceApplicationAnnotation: (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any) => void;
  applicationDidBecomeActive: () => void;
}

export interface NativescriptFacebookOauth {
  FacebookLoginHandler: IFacebookLoginHandler;
  connectToFacebookDelegate: () => void;
}
