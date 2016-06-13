"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
;
;
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
            if (error || !result || !result.token) {
                failCallback(error);
                return;
            }
            if (result.isCancelled) {
                cancelCallback();
                return;
            }
            successCallback(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVN5QyxDQUFDO0FBQ1MsQ0FBQztBQUlwRDtJQUFnQyw4QkFBVztJQUEzQztRQUFnQyw4QkFBVztJQVkzQyxDQUFDO0lBVEMsNkRBQXdDLEdBQXhDLFVBQXlDLFdBQTBCLEVBQUUsYUFBMkI7UUFDOUYsTUFBTSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4SCxDQUFDO0lBQ0Qsa0VBQTZDLEdBQTdDLFVBQThDLFdBQVcsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsVUFBVTtRQUMzRixNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLENBQUMsNkNBQTZDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsSixDQUFDO0lBQ0QsK0NBQTBCLEdBQTFCLFVBQTJCLFdBQTBCO1FBQ25ELGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBVmEsd0JBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFXeEQsaUJBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBZ0MsV0FBVyxHQVkxQztBQVpZLGtCQUFVLGFBWXRCLENBQUE7QUFFRDtJQUFBO1FBQ1UsV0FBTSxHQUFZLEtBQUssQ0FBQztJQTZDbEMsQ0FBQztJQTFDUSxtQ0FBSSxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVNLCtDQUFnQixHQUF2QixVQUF3QixlQUFvQixFQUFFLGNBQW1CLEVBQUUsWUFBaUI7UUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFTLE1BQW9DLEVBQUUsS0FBYztZQUNsRixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSx1REFBd0IsR0FBL0IsVUFBZ0MsV0FBcUI7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSwwREFBMkIsR0FBbEMsVUFBbUMsV0FBcUI7UUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7QUE5Q1ksNEJBQW9CLHVCQThDaEMsQ0FBQSJ9