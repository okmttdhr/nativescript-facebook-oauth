import application = require("application");
import { IFacebookLoginHandler } from "./index.d";

declare const com: any;
declare const java: any;

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

      // This solve the case when user changes accounts error code 304
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
      onSuccess: function(result) {
        successCallback(result);
      },
      onCancel: function() {
        cancelCallback();
      },
      onError: function(error) {
        failCallback(error);
      }
    }));
    // Overriding activity.onActivityResult method to send it to the callbackManager
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
