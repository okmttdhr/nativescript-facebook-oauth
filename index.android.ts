import applicationModule = require("application");

declare const com: any;
declare const java: any;
declare const android: any;

let _isInit: boolean = false;
let mCallbackManager;
let loginManager;

const _AndroidApplication = applicationModule.android;
let _activity = _AndroidApplication.foregroundActivity || _AndroidApplication.startActivity;

export function init(): boolean {
    try {
      com.facebook.FacebookSdk.sdkInitialize(_AndroidApplication.context.getApplicationContext());
      mCallbackManager = com.facebook.CallbackManager.Factory.create();
      loginManager = com.facebook.login.LoginManager.getInstance();

      // This solve the case when user changes accounts error code 304
      loginManager.logOut();

      return _isInit = true;
    } catch (e) {
      return false;
    }
}

export function registerCallback(successCallback: any, cancelCallback: any, failCallback: any) {
  if (_isInit) {
    loginManager.registerCallback(mCallbackManager, new com.facebook.FacebookCallback({
      onSuccess: function(result) {
        successCallback(result);
      },
      onCancel: function() {
        cancelCallback();
      },
      onError: function(e) {
        failCallback(e);
      }
    }));

    // Overriding Activity onActivityResult method to send it to the callbackManager
    _activity.onActivityResult = (requestCode: number, resultCode: number, data: android.content.Intent) => {
      mCallbackManager.onActivityResult(requestCode, resultCode, data);
    };
  }
}

export function logInWithPublishPermissions(permissions: string[]) {
  if (_isInit) {
    const javaPermissions = java.util.Arrays.asList(permissions);
    loginManager.logInWithPublishPermissions(_activity, javaPermissions);
  }
}

export function logInWithReadPermissions(permissions: string[]) {
  if (_isInit) {
    const javaPermissions = java.util.Arrays.asList(permissions);
    loginManager.logInWithReadPermissions(_activity, javaPermissions);
  }
}
