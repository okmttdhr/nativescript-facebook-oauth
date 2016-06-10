import applicationModule = require("application");

declare const FBSDKLoginManager: any;
declare type FBSDKLoginManagerLoginResult = any;
declare type NSError = any;

let _isInit: boolean = false;
let mCallbackManager;
let loginManager;


export function init(): boolean {
  loginManager = FBSDKLoginManager.alloc().init();
  if (!loginManager) {
    return false;
  }
  // This solve the case when user changes accounts error code 304
  loginManager.logOut();
  return _isInit = true;
}

export function registerCallback(successCallback: any, cancelCallback: any, failCallback: any) {
  if (_isInit) {
    mCallbackManager = function(result: FBSDKLoginManagerLoginResult, error: NSError) {
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

export function logInWithPublishPermissions(permissions: string[]) {
  if (_isInit) {
    loginManager.logInWithPublishPermissionsHandler(permissions, mCallbackManager);
  }
}

export function logInWithReadPermissions(permissions: string[]) {
  if (_isInit) {
    loginManager.logInWithReadPermissionsHandler(permissions, mCallbackManager);
  }
}
