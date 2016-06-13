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
            if (error) {
                var e = { message: error.localizedDescription, code: error.code, row: error };
                failCallback(e);
                return;
            }
            if (result.isCancelled) {
                cancelCallback();
                return;
            }
            successCallback(result.token.tokenString);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVN5QyxDQUFDO0FBQ1MsQ0FBQztBQUlwRDtJQUFnQyw4QkFBVztJQUEzQztRQUFnQyw4QkFBVztJQVkzQyxDQUFDO0lBVEMsNkRBQXdDLEdBQXhDLFVBQXlDLFdBQTBCLEVBQUUsYUFBMkI7UUFDOUYsTUFBTSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4SCxDQUFDO0lBQ0Qsa0VBQTZDLEdBQTdDLFVBQThDLFdBQVcsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsVUFBVTtRQUMzRixNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLENBQUMsNkNBQTZDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsSixDQUFDO0lBQ0QsK0NBQTBCLEdBQTFCLFVBQTJCLFdBQTBCO1FBQ25ELGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBVmEsd0JBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFXeEQsaUJBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBZ0MsV0FBVyxHQVkxQztBQVpZLGtCQUFVLGFBWXRCLENBQUE7QUFFRDtJQUFBO1FBQ1UsV0FBTSxHQUFZLEtBQUssQ0FBQztJQTJDbEMsQ0FBQztJQXhDUSxtQ0FBSSxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVNLCtDQUFnQixHQUF2QixVQUF3QixlQUFvQixFQUFFLGNBQW1CLEVBQUUsWUFBaUI7UUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFTLE1BQW9DLEVBQUUsS0FBYztZQUNsRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQU0sQ0FBQyxHQUF1QixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNwRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsY0FBYyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sdURBQXdCLEdBQS9CLFVBQWdDLFdBQXFCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRU0sMERBQTJCLEdBQWxDLFVBQW1DLFdBQXFCO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsa0NBQWtDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLDRCQUFvQix1QkE0Q2hDLENBQUEifQ==