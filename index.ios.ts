import applicationModule = require("application");
import { IFacebookLoginHandler } from "./index.d";

declare const FBSDKAppEvents: any;
declare const FBSDKApplicationDelegate: any;
declare const FBSDKLoginManager: any;
declare type FBSDKLoginManagerLoginResult = any;

declare type NSError = any;
export declare class UIResponder { any; };
export declare class UIApplicationDelegate { any; };
export declare type UIApplication = any;
export declare type NSDictionary = any;

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
    // This solve the case when user changes accounts error code 304
    this.loginManager.logOut();
    return this.isInit = true;
  }

  public registerCallback(successCallback: any, cancelCallback: any, failCallback: any) {
    if (!this.isInit) {
      return;
    }
    this.callbackManager = function(result: FBSDKLoginManagerLoginResult, error: NSError) {
      if (error || !result || !result.token) {
        failCallback(error);
        return;
      }

      if (result.isCancelled) {
        cancelCallback();
        return;
      }

      successCallback(result);
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
