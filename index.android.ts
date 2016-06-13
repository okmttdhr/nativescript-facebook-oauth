import application = require("application");
import { IFacebookLoginHandler, FacebookLoginError } from "./index.d";

declare const com: any;
declare const java: any;
declare type AccountKitLoginResult = any
declare type AccountKitRequestError = any

export class FacebookLoginHandler implements IFacebookLoginHandler {
  private isInit: boolean = false;
  private callbackManager: any;
  private loginManager: any;
  private activity: any = application.android.foregroundActivity || application.android.startActivity;
  public init() {
    try {
      com.facebook.FacebookSdk.sdkInitialize(application.android.context.getApplicationContext());
      this.callbackManager = com.facebook.CallbackManager.Factory.create();
      this.loginManager = com.facebook.login.LoginManager.getInstance();
      this.loginManager.logOut();

      return this.isInit = true;
    } catch (e) {
      return false;
    }
  }

  public registerCallback(successCallback: any, cancelCallback: any, failCallback: any) {
    if (!this.isInit) {
      return;
    }
    this.loginManager.registerCallback(this.callbackManager, new com.facebook.FacebookCallback({
      onSuccess: function(result: AccountKitLoginResult) {
        successCallback(result.getAccessToken().getToken());
      },
      onCancel: function() {
        cancelCallback();
      },
      onError: function(error: AccountKitRequestError) {
        const e: FacebookLoginError = { message: error.getErrorMessage(), code: error.getErrorCode(), row: error };
        failCallback(e);
      }
    }));
    this.activity.onActivityResult = (requestCode: number, resultCode: number, data: any) => {
      this.callbackManager.onActivityResult(requestCode, resultCode, data);
    };
  }

  public logInWithReadPermissions(permissions: string[]) {
    if (!this.isInit) {
      return;
    }
    const javaPermissions = java.util.Arrays.asList(permissions);
    this.loginManager.logInWithReadPermissions(this.activity, javaPermissions);
  }

  public logInWithPublishPermissions(permissions: string[]) {
    if (!this.isInit) {
      return;
    }
    const javaPermissions = java.util.Arrays.asList(permissions);
    this.loginManager.logInWithPublishPermissions(this.activity, javaPermissions);
  }
}
