import application = require("application");
import { IFacebookLoginHandler, FacebookLoginResult, FacebookLoginError } from "./index.d";

export class FacebookLoginHandler implements IFacebookLoginHandler {
  private isInit: boolean = false;
  private callbackManager: CallbackManager;
  private loginManager: LoginManager;
  private activity: AndroidAppActivity = application.android.foregroundActivity || application.android.startActivity;
  init() {
    try {
      com.facebook.FacebookSdk.sdkInitialize(application.android.context.getApplicationContext());
      this.callbackManager = com.facebook.CallbackManager.Factory.create();
      this.loginManager = com.facebook.login.LoginManager.getInstance();
      this.loginManager.logOut();
      return true;
    } catch (e) {
      return false;
    }
  }

  registerCallback(successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    this.loginManager.registerCallback(this.callbackManager, new com.facebook.FacebookCallback({
      onSuccess: function(result: AccountKitLoginResult) {
        const facebookLoginResult: FacebookLoginResult = { token: result.getAccessToken().getToken() };
        successCallback(facebookLoginResult);
      },
      onCancel: function() {
        cancelCallback();
      },
      onError: function(error: AccountKitRequestError) {
        const facebookLoginError: FacebookLoginError = { message: error.getErrorMessage(), code: error.getErrorCode(), raw: error };
        failCallback(facebookLoginError);
      }
    }));
    this.activity.onActivityResult = (requestCode: number, resultCode: number, data: android.content.Intent) => {
      this.callbackManager.onActivityResult(requestCode, resultCode, data);
    };
  }

  public logInWithReadPermissions(permissions: string[], successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    const javaPermissions = java.util.Arrays.asList(permissions);
    this.loginManager.logInWithReadPermissions(this.activity, javaPermissions);
  }

  public logInWithPublishPermissions(permissions: string[], successCallback: (FacebookLoginResult) => void, cancelCallback: () => void, failCallback: (FacebookLoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    const javaPermissions = java.util.Arrays.asList(permissions);
    this.loginManager.logInWithPublishPermissions(this.activity, javaPermissions);
  }
}
