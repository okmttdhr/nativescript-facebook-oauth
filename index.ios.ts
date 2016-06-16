import application = require("application");
import { IFacebookLoginHandler, LoginResult, LoginError, IFacebookDelegate } from "./index.d";

class FacebookDelegate extends UIResponder implements UIApplicationDelegate, IFacebookDelegate {
  public static ObjCProtocols = [UIApplicationDelegate];

  applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
    return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
  }
  applicationOpenURLSourceApplicationAnnotation(application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean {
    return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
  }
  applicationDidBecomeActive() {
    FBSDKAppEvents.activateApp();
  }
}

export function connectToFacebookDelegate() {
  application.ios.delegate = FacebookDelegate;
}

export class FacebookLoginHandler implements IFacebookLoginHandler {
  private callbackManager: FBSDKLoginManagerRequestTokenHandler;
  private loginManager: FBSDKLoginManager;
  init() {
    this.loginManager = new FBSDKLoginManager();
    if (!this.loginManager) {
      return false;
    }
    this.loginManager.logOut();
    return true;
  }

  registerCallback(successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) {
    this.callbackManager = function(result: FBSDKLoginManagerLoginResult, error: NSError) {
      if (error) {
        const LoginError: LoginError = { message: error.localizedDescription, code: error.code, raw: error };
        failCallback(LoginError);
        return;
      }
      if (result.isCancelled) {
        cancelCallback();
        return;
      }
      const LoginResult: LoginResult = { token: result.token.tokenString };
      successCallback(LoginResult);
    };
  }

  public logInWithReadPermissions(permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
  }

  public logInWithPublishPermissions(permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
  }
}
