"use strict";
var application = require("application");
var FacebookLoginHandler = (function () {
    function FacebookLoginHandler() {
        this.isInit = false;
        this.activity = application.android.foregroundActivity || application.android.startActivity;
    }
    FacebookLoginHandler.prototype.init = function () {
        try {
            com.facebook.FacebookSdk.sdkInitialize(application.android.context.getApplicationContext());
            this.callbackManager = com.facebook.CallbackManager.Factory.create();
            this.loginManager = com.facebook.login.LoginManager.getInstance();
            this.loginManager.logOut();
            return this.isInit = true;
        }
        catch (e) {
            return false;
        }
    };
    FacebookLoginHandler.prototype.registerCallback = function (successCallback, cancelCallback, failCallback) {
        var _this = this;
        if (!this.isInit) {
            return;
        }
        this.loginManager.registerCallback(this.callbackManager, new com.facebook.FacebookCallback({
            onSuccess: function (result) {
                successCallback(result.getAccessToken().getToken());
            },
            onCancel: function () {
                cancelCallback();
            },
            onError: function (error) {
                var e = { message: error.getErrorMessage(), code: error.getErrorCode(), row: error };
                failCallback(e);
            }
        }));
        this.activity.onActivityResult = function (requestCode, resultCode, data) {
            _this.callbackManager.onActivityResult(requestCode, resultCode, data);
        };
    };
    FacebookLoginHandler.prototype.logInWithReadPermissions = function (permissions) {
        if (!this.isInit) {
            return;
        }
        var javaPermissions = java.util.Arrays.asList(permissions);
        this.loginManager.logInWithReadPermissions(this.activity, javaPermissions);
    };
    FacebookLoginHandler.prototype.logInWithPublishPermissions = function (permissions) {
        if (!this.isInit) {
            return;
        }
        var javaPermissions = java.util.Arrays.asList(permissions);
        this.loginManager.logInWithPublishPermissions(this.activity, javaPermissions);
    };
    return FacebookLoginHandler;
}());
exports.FacebookLoginHandler = FacebookLoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBUTVDO0lBQUE7UUFDVSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBR3hCLGFBQVEsR0FBUSxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBa0R0RyxDQUFDO0lBakRRLG1DQUFJLEdBQVg7UUFDRSxJQUFJLENBQUM7WUFDSCxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBRU0sK0NBQWdCLEdBQXZCLFVBQXdCLGVBQW9CLEVBQUUsY0FBbUIsRUFBRSxZQUFpQjtRQUFwRixpQkFtQkM7UUFsQkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN6RixTQUFTLEVBQUUsVUFBUyxNQUE2QjtnQkFDL0MsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUM7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsY0FBYyxFQUFFLENBQUM7WUFDbkIsQ0FBQztZQUNELE9BQU8sRUFBRSxVQUFTLEtBQTZCO2dCQUM3QyxJQUFNLENBQUMsR0FBdUIsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUMzRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLFdBQW1CLEVBQUUsVUFBa0IsRUFBRSxJQUFTO1lBQ2xGLEtBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sdURBQXdCLEdBQS9CLFVBQWdDLFdBQXFCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLDBEQUEyQixHQUFsQyxVQUFtQyxXQUFxQjtRQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUF0REQsSUFzREM7QUF0RFksNEJBQW9CLHVCQXNEaEMsQ0FBQSJ9