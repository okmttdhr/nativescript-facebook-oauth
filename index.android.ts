import application = require("application");
import { IFacebookLoginHandler, LoginResult, LoginError } from "./index.d";

export function connectToFacebookDelegate() {
  return;
}

export class FacebookLoginHandler implements IFacebookLoginHandler {
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

  registerCallback(successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) {
    this.loginManager.registerCallback(this.callbackManager, new com.facebook.FacebookCallback({
      onSuccess: function(result: AccountKitLoginResult) {
        const LoginResult: LoginResult = { token: result.getAccessToken().getToken() };
        successCallback(LoginResult);
      },
      onCancel: function() {
        cancelCallback();
      },
      onError: function(error: AccountKitRequestError) {
        const LoginError: LoginError = { message: error.getErrorMessage(), code: error.getErrorCode(), raw: error };
        failCallback(LoginError);
      }
    }));
    this.activity.onActivityResult = (requestCode: number, resultCode: number, data: android.content.Intent) => {
      this.callbackManager.onActivityResult(requestCode, resultCode, data);
    };
  }

  public logInWithReadPermissions(permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    const javaPermissions = java.util.Arrays.asList(permissions);
    this.loginManager.logInWithReadPermissions(this.activity, javaPermissions);
  }

  public logInWithPublishPermissions(permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) {
    if (!this.init()) {
      return;
    }
    this.registerCallback(successCallback, cancelCallback, failCallback);
    const javaPermissions = java.util.Arrays.asList(permissions);
    this.loginManager.logInWithPublishPermissions(this.activity, javaPermissions);
  }
}
