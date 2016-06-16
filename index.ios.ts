import application = require("application");
import { IFacebookLoginHandler, FacebookLoginResult, FacebookLoginError } from "./index.d";

export class FBDelegate extends UIResponder implements UIApplicationDelegate {
  public static ObjCProtocols = [UIApplicationDelegate];

  applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
    return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
  }
  applicationOpenURLSourceApplicationAnnotation(application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean {
    return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
  }
  applicationDidBecomeActive(application: UIApplication): void {
    FBSDKAppEvents.activateApp();
  }
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

  registerCallback(successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    this.callbackManager = function(result: FBSDKLoginManagerLoginResult, error: NSError) {
      if (error) {
        const facebookLoginError: FacebookLoginError = { message: error.localizedDescription, code: error.code, raw: error };
        failCallback(facebookLoginError);
        return;
      }
      if (result.isCancelled) {
        cancelCallback();
        return;
      }
      const facebookLoginResult: FacebookLoginResult = { token: result.token.tokenString };
      successCallback(facebookLoginResult);
    };
  }

  public logInWithReadPermissions(permissions: string[], successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
  }

  public logInWithPublishPermissions(permissions: string[], successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
  }
}
