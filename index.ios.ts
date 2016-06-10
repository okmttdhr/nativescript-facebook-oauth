import applicationModule = require("application");
import { IFacebookLoginHandler } from "./index.d";

declare const FBSDKLoginManager: any;
declare type FBSDKLoginManagerLoginResult = any;
declare type NSError = any;

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
    if (this.isInit) {
      this.callbackManager = function(result: FBSDKLoginManagerLoginResult, error: NSError) {
        if (error) {
          failCallback(error);
          return;
        }

        // something went really wrong no error and no result
        if (!result) {
          failCallback("Null error");
          return;
        }

        if (result.isCancelled) {
          cancelCallback();
          return;
        }

        if (result.token) {
          successCallback(result);
        } else {
          failCallback("Could not acquire an access token");
          return;
        }
      };
    }
  }

  public logInWithPublishPermissions(permissions: string[]) {
    if (this.isInit) {
      this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
    }
  }

  public logInWithReadPermissions(permissions: string[]) {
    if (this.isInit) {
      this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
    }
  }
}
