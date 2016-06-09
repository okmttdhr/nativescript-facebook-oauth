"use strict";
var applicationModule = require("application");
var _isInit = false;
var _act;
var mCallbackManager;
var loginManager;
var _AndroidApplication = applicationModule.android;
var _activity = _AndroidApplication.foregroundActivity || _AndroidApplication.startActivity;
function init(loginBehavior) {
    try {
        com.facebook.FacebookSdk.sdkInitialize(_AndroidApplication.context.getApplicationContext());
    }
    catch (e) {
        console.log("nativescript-facebook-login: The plugin could not find the android library, try to clean the android platform");
    }
    mCallbackManager = com.facebook.CallbackManager.Factory.create();
    loginManager = com.facebook.login.LoginManager.getInstance();
    loginManager.logOut();
    if (loginBehavior) {
        loginManager = loginManager.setLoginBehavior(loginBehavior);
    }
    if (mCallbackManager && loginManager) {
        _isInit = true;
        return true;
    }
    else {
        return false;
    }
}
exports.init = init;
function registerCallback(successCallback, cancelCallback, failCallback) {
    if (_isInit) {
        var act = _AndroidApplication.foregroundActivity || _AndroidApplication.startActivity;
        _act = act;
        loginManager.registerCallback(mCallbackManager, new com.facebook.FacebookCallback({
            onSuccess: function (result) {
                successCallback(result);
            },
            onCancel: function () {
                cancelCallback();
            },
            onError: function (e) {
                failCallback(e);
            }
        }));
        act.onActivityResult = function (requestCode, resultCode, data) {
            mCallbackManager.onActivityResult(requestCode, resultCode, data);
        };
    }
}
exports.registerCallback = registerCallback;
function logInWithPublishPermissions(permissions) {
    if (_isInit) {
        var javaPermissions = java.util.Arrays.asList(permissions);
        loginManager.logInWithPublishPermissions(_act, javaPermissions);
    }
}
exports.logInWithPublishPermissions = logInWithPublishPermissions;
function logInWithReadPermissions(permissions) {
    if (_isInit) {
        var javaPermissions = java.util.Arrays.asList(permissions);
        loginManager.logInWithReadPermissions(_act, javaPermissions);
    }
}
exports.logInWithReadPermissions = logInWithReadPermissions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8saUJBQWlCLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFbEQsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO0FBQzdCLElBQUksSUFBSSxDQUFDO0FBQ1QsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLFlBQVksQ0FBQztBQUVqQixJQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztBQUV0RCxJQUFJLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxrQkFBa0IsSUFBSSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7QUFFNUYsY0FBcUIsYUFBbUI7SUFDcEMsSUFBSSxDQUFDO1FBRUgsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7SUFDOUYsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLCtHQUErRyxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUVELGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqRSxZQUFZLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRzdELFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLFlBQVksR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNMLENBQUM7QUF2QmUsWUFBSSxPQXVCbkIsQ0FBQTtBQUVELDBCQUFpQyxlQUFvQixFQUFFLGNBQW1CLEVBQUUsWUFBaUI7SUFDM0YsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQU0sR0FBRyxHQUFHLG1CQUFtQixDQUFDLGtCQUFrQixJQUFJLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUN4RixJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRVgsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRixTQUFTLEVBQUUsVUFBUyxNQUFNO2dCQUN4QixlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUNELFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUUsQ0FBQztZQUVuQixDQUFDO1lBQ0QsT0FBTyxFQUFFLFVBQVMsQ0FBQztnQkFDakIsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQztRQUdKLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLFdBQW1CLEVBQUUsVUFBa0IsRUFBRSxJQUE0QjtZQUMzRixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBdkJlLHdCQUFnQixtQkF1Qi9CLENBQUE7QUFFRCxxQ0FBNEMsV0FBcUI7SUFDL0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU3RCxZQUFZLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7QUFDSCxDQUFDO0FBTmUsbUNBQTJCLDhCQU0xQyxDQUFBO0FBRUQsa0NBQXlDLFdBQXFCO0lBQzVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0QsWUFBWSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMvRCxDQUFDO0FBQ0gsQ0FBQztBQU5lLGdDQUF3QiwyQkFNdkMsQ0FBQSJ9