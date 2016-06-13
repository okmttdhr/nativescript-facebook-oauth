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
                successCallback(result);
            },
            onCancel: function () {
                cancelCallback();
            },
            onError: function (error) {
                failCallback(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBTTVDO0lBQUE7UUFDVSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBR3hCLGFBQVEsR0FBUSxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBb0R0RyxDQUFDO0lBbkRRLG1DQUFJLEdBQVg7UUFDRSxJQUFJLENBQUM7WUFDSCxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBR2xFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBRU0sK0NBQWdCLEdBQXZCLFVBQXdCLGVBQW9CLEVBQUUsY0FBbUIsRUFBRSxZQUFpQjtRQUFwRixpQkFtQkM7UUFsQkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN6RixTQUFTLEVBQUUsVUFBUyxNQUFNO2dCQUN4QixlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUNELFFBQVEsRUFBRTtnQkFDUixjQUFjLEVBQUUsQ0FBQztZQUNuQixDQUFDO1lBQ0QsT0FBTyxFQUFFLFVBQVMsS0FBSztnQkFDckIsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxXQUFtQixFQUFFLFVBQWtCLEVBQUUsSUFBUztZQUNsRixLQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLHVEQUF3QixHQUEvQixVQUFnQyxXQUFxQjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSwwREFBMkIsR0FBbEMsVUFBbUMsV0FBcUI7UUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDO0FBeERZLDRCQUFvQix1QkF3RGhDLENBQUEifQ==