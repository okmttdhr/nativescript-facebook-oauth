import applicationModule = require("application");
import { IFacebookLoginHandler, FacebookLoginResult, FacebookLoginError } from "./index.d";

declare const FBSDKAppEvents: any;
declare const FBSDKApplicationDelegate: any;
declare const FBSDKLoginManager: any;
declare type FBSDKLoginManagerLoginResult = any;

export class FBDelegate extends UIResponder implements UIApplicationDelegate {
  public static ObjCProtocols = [UIApplicationDelegate];

  applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
    return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
  }
  applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
    return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
  }
  applicationDidBecomeActive(application: UIApplication): void {
    FBSDKAppEvents.activateApp();
  }
}

export class FacebookLoginHandler implements IFacebookLoginHandler {
  private isInit: boolean = false;
  private callbackManager: any;
  private loginManager: any;
  public init() {
    this.loginManager = FBSDKLoginManager.alloc().init();
    if (!this.loginManager) {
      return false;
    }
    this.loginManager.logOut();
    return this.isInit = true;
  }

  public registerCallback(successCallback: any, cancelCallback: any, failCallback: any) {
    if (!this.isInit) {
      return;
    }
    this.callbackManager = function(result: FBSDKLoginManagerLoginResult, error: NSError) {
      if (error) {
        const facebookLoginError: FacebookLoginError = { message: error.localizedDescription, code: error.code, row: error };
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

  public logInWithReadPermissions(permissions: string[]) {
    if (!this.isInit) {
      return;
    }
    this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
  }

  public logInWithPublishPermissions(permissions: string[]) {
    if (!this.isInit) {
      return;
    }
    this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
  }
}
