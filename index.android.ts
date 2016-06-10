import applicationModule = require("application");

let _isInit: boolean = false;
let _act;
let mCallbackManager;
let loginManager;

const _AndroidApplication = applicationModule.android;

let _activity = _AndroidApplication.foregroundActivity || _AndroidApplication.startActivity;

export function init(loginBehavior?: any): boolean {
    try {
      // fb initialization
      com.facebook.FacebookSdk.sdkInitialize(_AndroidApplication.context.getApplicationContext());
    } catch (e) {
      console.log("nativescript-facebook-login: The plugin could not find the android library, try to clean the android platform");
    }

    mCallbackManager = com.facebook.CallbackManager.Factory.create();
    loginManager = com.facebook.login.LoginManager.getInstance();

    // This solve the case when user changes accounts error code 304
    loginManager.logOut();
    if (loginBehavior) {
      loginManager = loginManager.setLoginBehavior(loginBehavior);
    }

    if (mCallbackManager && loginManager) {
      _isInit = true;
      return true;
    } else {
      return false;
    }
}

export function registerCallback(successCallback: any, cancelCallback: any, failCallback: any) {
  if (_isInit) {
    const act = _AndroidApplication.foregroundActivity || _AndroidApplication.startActivity;
    _act = act;

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
    act.onActivityResult = (requestCode: number, resultCode: number, data: android.content.Intent) => {
      mCallbackManager.onActivityResult(requestCode, resultCode, data);
    };
  }
}

export function logInWithPublishPermissions(permissions: string[]) {
  if (_isInit) {
    const javaPermissions = java.util.Arrays.asList(permissions);
    // Start the login process
    loginManager.logInWithPublishPermissions(_act, javaPermissions);
  }
}

export function logInWithReadPermissions(permissions: string[]) {
  if (_isInit) {
    const javaPermissions = java.util.Arrays.asList(permissions);
    // Start the login process
    loginManager.logInWithReadPermissions(_act, javaPermissions);
  }
}