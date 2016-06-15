import application = require("application");
import { IFacebookLoginHandler, FacebookLoginResult, FacebookLoginError } from "./index.d";

declare const FBSDKApplicationDelegate: {
  sharedInstance: () => {
    applicationDidFinishLaunchingWithOptions: (application: UIApplication, launchOptions: NSDictionary) => boolean;
    applicationOpenURLSourceApplicationAnnotation: (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any) => boolean;
  };
};
declare const FBSDKAppEvents: {
  activateApp: () => void;
};

interface FBSDKAccessToken {
  tokenString: string;
}
interface FBSDKLoginManagerLoginResult {
  isCancelled: boolean;
  token: FBSDKAccessToken;
};
type FBSDKLoginManagerRequestTokenHandler = (result: FBSDKLoginManagerLoginResult, error: NSError) => void;
declare class FBSDKLoginManager {
  logOut: () => void;
  logInWithReadPermissionsHandler: (permissions: string[], callback: FBSDKLoginManagerRequestTokenHandler) => void;
  logInWithPublishPermissionsHandler: (permissions: string[], callback: FBSDKLoginManagerRequestTokenHandler) => void;
};

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
  private isInit: boolean = false;
  private callbackManager: FBSDKLoginManagerRequestTokenHandler;
  private loginManager: FBSDKLoginManager;
  public init() {
    this.loginManager = new FBSDKLoginManager();
    if (!this.loginManager) {
      return false;
    }
    this.loginManager.logOut();
    return this.isInit = true;
  }

  public registerCallback(successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    if (!this.isInit) {
      return;
    }
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
