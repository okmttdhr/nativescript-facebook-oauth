"use strict";
var applicationModule = require("application");
var android;
(function (android) {
    var content = (function () {
        function content() {
        }
        return content;
    }());
    android.content = content;
    ;
})(android || (android = {}));
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
        return _isInit = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8saUJBQWlCLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFLbEQsSUFBVSxPQUFPLENBRWhCO0FBRkQsV0FBVSxPQUFPLEVBQUMsQ0FBQztJQUNqQjtRQUFBO1FBQXNCLENBQUM7UUFBRCxjQUFDO0lBQUQsQ0FBQyxBQUF2QixJQUF1QjtJQUFWLGVBQU8sVUFBRyxDQUFBO0lBQUEsQ0FBQztBQUMxQixDQUFDLEVBRlMsT0FBTyxLQUFQLE9BQU8sUUFFaEI7QUFFRCxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFDN0IsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLFlBQVksQ0FBQztBQUVqQixJQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztBQUN0RCxJQUFJLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxrQkFBa0IsSUFBSSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7QUFFNUY7SUFDSSxJQUFJLENBQUM7UUFDSCxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztRQUM1RixnQkFBZ0IsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakUsWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUc3RCxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNMLENBQUM7QUFiZSxZQUFJLE9BYW5CLENBQUE7QUFFRCwwQkFBaUMsZUFBb0IsRUFBRSxjQUFtQixFQUFFLFlBQWlCO0lBQzNGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWixZQUFZLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ2hGLFNBQVMsRUFBRSxVQUFTLE1BQU07Z0JBQ3hCLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFDRCxPQUFPLEVBQUUsVUFBUyxDQUFDO2dCQUNqQixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO1FBR0osU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQUMsV0FBbUIsRUFBRSxVQUFrQixFQUFFLElBQTRCO1lBQ2pHLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUFuQmUsd0JBQWdCLG1CQW1CL0IsQ0FBQTtBQUVELHFDQUE0QyxXQUFxQjtJQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1osSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdELFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkUsQ0FBQztBQUNILENBQUM7QUFMZSxtQ0FBMkIsOEJBSzFDLENBQUE7QUFFRCxrQ0FBeUMsV0FBcUI7SUFDNUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RCxZQUFZLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7QUFDSCxDQUFDO0FBTGUsZ0NBQXdCLDJCQUt2QyxDQUFBIn0=