"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var application = require("application");
var FacebookDelegate = (function (_super) {
    __extends(FacebookDelegate, _super);
    function FacebookDelegate() {
        _super.apply(this, arguments);
    }
    FacebookDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
    };
    FacebookDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
        return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
    };
    FacebookDelegate.prototype.applicationDidBecomeActive = function () {
        FBSDKAppEvents.activateApp();
    };
    FacebookDelegate.ObjCProtocols = [UIApplicationDelegate];
    return FacebookDelegate;
}(UIResponder));
function connectToFacebookDelegate() {
    application.ios.delegate = FacebookDelegate;
}
exports.connectToFacebookDelegate = connectToFacebookDelegate;
var FacebookLoginHandler = (function () {
    function FacebookLoginHandler() {
    }
    FacebookLoginHandler.prototype.init = function () {
        this.loginManager = new FBSDKLoginManager();
        if (!this.loginManager) {
            return false;
        }
        this.loginManager.logOut();
        return true;
    };
    FacebookLoginHandler.prototype.registerCallback = function (successCallback, cancelCallback, failCallback) {
        this.callbackManager = function (result, error) {
            if (error) {
                var LoginError = { message: error.localizedDescription, code: error.code, raw: error };
                failCallback(LoginError);
                return;
            }
            if (result.isCancelled) {
                cancelCallback();
                return;
            }
            var LoginResult = { token: result.token.tokenString };
            successCallback(LoginResult);
        };
    };
    FacebookLoginHandler.prototype.logInWithReadPermissions = function (permissions, successCallback, cancelCallback, failCallback) {
        if (!this.init()) {
            return;
        }
        this.registerCallback(successCallback, cancelCallback, failCallback);
        this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
    };
    FacebookLoginHandler.prototype.logInWithPublishPermissions = function (permissions, successCallback, cancelCallback, failCallback) {
        if (!this.init()) {
            return;
        }
        this.registerCallback(successCallback, cancelCallback, failCallback);
        this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
    };
    return FacebookLoginHandler;
}());
exports.FacebookLoginHandler = FacebookLoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRzVDO0lBQStCLG9DQUFXO0lBQTFDO1FBQStCLDhCQUFXO0lBWTFDLENBQUM7SUFUQyxtRUFBd0MsR0FBeEMsVUFBeUMsV0FBMEIsRUFBRSxhQUEyQjtRQUM5RixNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLENBQUMsd0NBQXdDLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hILENBQUM7SUFDRCx3RUFBNkMsR0FBN0MsVUFBOEMsV0FBMEIsRUFBRSxHQUFVLEVBQUUsaUJBQXlCLEVBQUUsVUFBZTtRQUM5SCxNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLENBQUMsNkNBQTZDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsSixDQUFDO0lBQ0QscURBQTBCLEdBQTFCO1FBQ0UsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFWYSw4QkFBYSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQVd4RCx1QkFBQztBQUFELENBQUMsQUFaRCxDQUErQixXQUFXLEdBWXpDO0FBRUQ7SUFDRSxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztBQUM5QyxDQUFDO0FBRmUsaUNBQXlCLDRCQUV4QyxDQUFBO0FBRUQ7SUFBQTtJQTJDQSxDQUFDO0lBeENDLG1DQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtDQUFnQixHQUFoQixVQUFpQixlQUFzQyxFQUFFLGNBQTBCLEVBQUUsWUFBa0M7UUFDckgsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFTLE1BQW9DLEVBQUUsS0FBYztZQUNsRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQU0sVUFBVSxHQUFlLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ3JHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixjQUFjLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELElBQU0sV0FBVyxHQUFnQixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JFLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sdURBQXdCLEdBQS9CLFVBQWdDLFdBQXFCLEVBQUUsZUFBc0MsRUFBRSxjQUEwQixFQUFFLFlBQWtDO1FBQzNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSwwREFBMkIsR0FBbEMsVUFBbUMsV0FBcUIsRUFBRSxlQUFzQyxFQUFFLGNBQTBCLEVBQUUsWUFBa0M7UUFDOUosRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLGtDQUFrQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQztBQTNDWSw0QkFBb0IsdUJBMkNoQyxDQUFBIn0=