"use strict";
var application = require("application");
function connectToFacebookDelegate() {
    return;
}
exports.connectToFacebookDelegate = connectToFacebookDelegate;
var FacebookLoginHandler = (function () {
    function FacebookLoginHandler() {
        this.activity = application.android.foregroundActivity || application.android.startActivity;
    }
    FacebookLoginHandler.prototype.init = function () {
        try {
            com.facebook.FacebookSdk.sdkInitialize(application.android.context.getApplicationContext());
            this.callbackManager = com.facebook.CallbackManager.Factory.create();
            this.loginManager = com.facebook.login.LoginManager.getInstance();
            this.loginManager.logOut();
            return true;
        }
        catch (e) {
            return false;
        }
    };
    FacebookLoginHandler.prototype.registerCallback = function (successCallback, cancelCallback, failCallback) {
        var _this = this;
        this.loginManager.registerCallback(this.callbackManager, new com.facebook.FacebookCallback({
            onSuccess: function (result) {
                var LoginResult = { token: result.getAccessToken().getToken() };
                successCallback(LoginResult);
            },
            onCancel: function () {
                cancelCallback();
            },
            onError: function (error) {
                var LoginError = { message: error.getErrorMessage(), code: error.getErrorCode(), raw: error };
                failCallback(LoginError);
            }
        }));
        this.activity.onActivityResult = function (requestCode, resultCode, data) {
            _this.callbackManager.onActivityResult(requestCode, resultCode, data);
        };
    };
    FacebookLoginHandler.prototype.logInWithReadPermissions = function (permissions, successCallback, cancelCallback, failCallback) {
        if (!this.init()) {
            return;
        }
        this.registerCallback(successCallback, cancelCallback, failCallback);
        var javaPermissions = java.util.Arrays.asList(permissions);
        this.loginManager.logInWithReadPermissions(this.activity, javaPermissions);
    };
    FacebookLoginHandler.prototype.logInWithPublishPermissions = function (permissions, successCallback, cancelCallback, failCallback) {
        if (!this.init()) {
            return;
        }
        this.registerCallback(successCallback, cancelCallback, failCallback);
        var javaPermissions = java.util.Arrays.asList(permissions);
        this.loginManager.logInWithPublishPermissions(this.activity, javaPermissions);
    };
    return FacebookLoginHandler;
}());
exports.FacebookLoginHandler = FacebookLoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRzVDO0lBQ0UsTUFBTSxDQUFDO0FBQ1QsQ0FBQztBQUZlLGlDQUF5Qiw0QkFFeEMsQ0FBQTtBQUVEO0lBQUE7UUFHVSxhQUFRLEdBQXVCLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFpRHJILENBQUM7SUFoREMsbUNBQUksR0FBSjtRQUNFLElBQUksQ0FBQztZQUNILEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsZUFBc0MsRUFBRSxjQUEwQixFQUFFLFlBQWtDO1FBQXZILGlCQWlCQztRQWhCQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ3pGLFNBQVMsRUFBRSxVQUFTLE1BQTZCO2dCQUMvQyxJQUFNLFdBQVcsR0FBZ0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7Z0JBQy9FLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFDRCxPQUFPLEVBQUUsVUFBUyxLQUE2QjtnQkFDN0MsSUFBTSxVQUFVLEdBQWUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUM1RyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLFdBQW1CLEVBQUUsVUFBa0IsRUFBRSxJQUE0QjtZQUNyRyxLQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLHVEQUF3QixHQUEvQixVQUFnQyxXQUFxQixFQUFFLGVBQXNDLEVBQUUsY0FBMEIsRUFBRSxZQUFrQztRQUMzSixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLDBEQUEyQixHQUFsQyxVQUFtQyxXQUFxQixFQUFFLGVBQXNDLEVBQUUsY0FBMEIsRUFBRSxZQUFrQztRQUM5SixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQXBERCxJQW9EQztBQXBEWSw0QkFBb0IsdUJBb0RoQyxDQUFBIn0=