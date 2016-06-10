"use strict";
var applicationModule = require("application");
var _isInit = false;
var mCallbackManager;
var loginManager;
var _AndroidApplication = applicationModule.android;
var _activity = _AndroidApplication.foregroundActivity || _AndroidApplication.startActivity;
function init() {
    try {
        com.facebook.FacebookSdk.sdkInitialize(_AndroidApplication.context.getApplicationContext());
        mCallbackManager = com.facebook.CallbackManager.Factory.create();
        loginManager = com.facebook.login.LoginManager.getInstance();
        loginManager.logOut();
        _isInit = true;
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.init = init;
function registerCallback(successCallback, cancelCallback, failCallback) {
    if (_isInit) {
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
        _activity.onActivityResult = function (requestCode, resultCode, data) {
            mCallbackManager.onActivityResult(requestCode, resultCode, data);
        };
    }
}
exports.registerCallback = registerCallback;
function logInWithPublishPermissions(permissions) {
    if (_isInit) {
        var javaPermissions = java.util.Arrays.asList(permissions);
        loginManager.logInWithPublishPermissions(_activity, javaPermissions);
    }
}
exports.logInWithPublishPermissions = logInWithPublishPermissions;
function logInWithReadPermissions(permissions) {
    if (_isInit) {
        var javaPermissions = java.util.Arrays.asList(permissions);
        loginManager.logInWithReadPermissions(_activity, javaPermissions);
    }
}
exports.logInWithReadPermissions = logInWithReadPermissions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8saUJBQWlCLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFNbEQsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO0FBQzdCLElBQUksZ0JBQWdCLENBQUM7QUFDckIsSUFBSSxZQUFZLENBQUM7QUFFakIsSUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7QUFDdEQsSUFBSSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsa0JBQWtCLElBQUksbUJBQW1CLENBQUMsYUFBYSxDQUFDO0FBRTVGO0lBQ0ksSUFBSSxDQUFDO1FBQ0gsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7UUFDNUYsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pFLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFHN0QsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRCLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNMLENBQUM7QUFkZSxZQUFJLE9BY25CLENBQUE7QUFFRCwwQkFBaUMsZUFBb0IsRUFBRSxjQUFtQixFQUFFLFlBQWlCO0lBQzNGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWixZQUFZLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ2hGLFNBQVMsRUFBRSxVQUFTLE1BQU07Z0JBQ3hCLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFDRCxPQUFPLEVBQUUsVUFBUyxDQUFDO2dCQUNqQixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO1FBR0osU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQUMsV0FBbUIsRUFBRSxVQUFrQixFQUFFLElBQTRCO1lBQ2pHLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUFuQmUsd0JBQWdCLG1CQW1CL0IsQ0FBQTtBQUVELHFDQUE0QyxXQUFxQjtJQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1osSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdELFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkUsQ0FBQztBQUNILENBQUM7QUFMZSxtQ0FBMkIsOEJBSzFDLENBQUE7QUFFRCxrQ0FBeUMsV0FBcUI7SUFDNUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RCxZQUFZLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7QUFDSCxDQUFDO0FBTGUsZ0NBQXdCLDJCQUt2QyxDQUFBIn0=