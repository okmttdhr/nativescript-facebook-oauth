"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FBDelegate = (function (_super) {
    __extends(FBDelegate, _super);
    function FBDelegate() {
        _super.apply(this, arguments);
    }
    FBDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
    };
    FBDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
        return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
    };
    FBDelegate.prototype.applicationDidBecomeActive = function (application) {
        FBSDKAppEvents.activateApp();
    };
    FBDelegate.ObjCProtocols = [UIApplicationDelegate];
    return FBDelegate;
}(UIResponder));
exports.FBDelegate = FBDelegate;
var FacebookLoginHandler = (function () {
    function FacebookLoginHandler() {
        this.isInit = false;
    }
    FacebookLoginHandler.prototype.init = function () {
        this.loginManager = FBSDKLoginManager.alloc().init();
        if (!this.loginManager) {
            return false;
        }
        this.loginManager.logOut();
        return this.isInit = true;
    };
    FacebookLoginHandler.prototype.registerCallback = function (successCallback, cancelCallback, failCallback) {
        if (!this.isInit) {
            return;
        }
        this.callbackManager = function (result, error) {
            if (error) {
                var facebookLoginError = { message: error.localizedDescription, code: error.code, row: error };
                failCallback(facebookLoginError);
                return;
            }
            if (result.isCancelled) {
                cancelCallback();
                return;
            }
            var facebookLoginResult = { token: result.token.tokenString };
            successCallback(facebookLoginResult);
        };
    };
    FacebookLoginHandler.prototype.logInWithReadPermissions = function (permissions) {
        if (!this.isInit) {
            return;
        }
        this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
    };
    FacebookLoginHandler.prototype.logInWithPublishPermissions = function (permissions) {
        if (!this.isInit) {
            return;
        }
        this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
    };
    return FacebookLoginHandler;
}());
exports.FacebookLoginHandler = FacebookLoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFBO0lBQWdDLDhCQUFXO0lBQTNDO1FBQWdDLDhCQUFXO0lBWTNDLENBQUM7SUFUQyw2REFBd0MsR0FBeEMsVUFBeUMsV0FBMEIsRUFBRSxhQUEyQjtRQUM5RixNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLENBQUMsd0NBQXdDLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hILENBQUM7SUFDRCxrRUFBNkMsR0FBN0MsVUFBOEMsV0FBVyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxVQUFVO1FBQzNGLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xKLENBQUM7SUFDRCwrQ0FBMEIsR0FBMUIsVUFBMkIsV0FBMEI7UUFDbkQsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFWYSx3QkFBYSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQVd4RCxpQkFBQztBQUFELENBQUMsQUFaRCxDQUFnQyxXQUFXLEdBWTFDO0FBWlksa0JBQVUsYUFZdEIsQ0FBQTtBQUVEO0lBQUE7UUFDVSxXQUFNLEdBQVksS0FBSyxDQUFDO0lBNENsQyxDQUFDO0lBekNRLG1DQUFJLEdBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sK0NBQWdCLEdBQXZCLFVBQXdCLGVBQW9CLEVBQUUsY0FBbUIsRUFBRSxZQUFpQjtRQUNsRixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVMsTUFBb0MsRUFBRSxLQUFjO1lBQ2xGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBTSxrQkFBa0IsR0FBdUIsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDckgsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsY0FBYyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxJQUFNLG1CQUFtQixHQUF3QixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JGLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSx1REFBd0IsR0FBL0IsVUFBZ0MsV0FBcUI7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSwwREFBMkIsR0FBbEMsVUFBbUMsV0FBcUI7UUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksNEJBQW9CLHVCQTZDaEMsQ0FBQSJ9