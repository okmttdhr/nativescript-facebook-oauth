"use strict";
var _isInit = false;
var mCallbackManager;
var loginManager;
function init() {
    loginManager = FBSDKLoginManager.alloc().init();
    if (!loginManager) {
        return false;
    }
    loginManager.logOut();
    return _isInit = true;
}
exports.init = init;
function registerCallback(successCallback, cancelCallback, failCallback) {
    if (_isInit) {
        mCallbackManager = function (result, error) {
            if (error) {
                failCallback(error);
                return;
            }
            if (!result) {
                failCallback("Null error");
                return;
            }
            if (result.isCancelled) {
                cancelCallback();
                return;
            }
            if (result.token) {
                successCallback(result);
            }
            else {
                failCallback("Could not acquire an access token");
                return;
            }
        };
    }
}
exports.registerCallback = registerCallback;
function logInWithPublishPermissions(permissions) {
    if (_isInit) {
        loginManager.logInWithPublishPermissionsHandler(permissions, mCallbackManager);
    }
}
exports.logInWithPublishPermissions = logInWithPublishPermissions;
function logInWithReadPermissions(permissions) {
    if (_isInit) {
        loginManager.logInWithReadPermissionsHandler(permissions, mCallbackManager);
    }
}
exports.logInWithReadPermissions = logInWithReadPermissions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFDN0IsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLFlBQVksQ0FBQztBQUdqQjtJQUNFLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEIsQ0FBQztBQVJlLFlBQUksT0FRbkIsQ0FBQTtBQUVELDBCQUFpQyxlQUFvQixFQUFFLGNBQW1CLEVBQUUsWUFBaUI7SUFDM0YsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLGdCQUFnQixHQUFHLFVBQVMsTUFBb0MsRUFBRSxLQUFjO1lBQzlFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUM7WUFDVCxDQUFDO1lBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixjQUFjLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFlBQVksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUM7WUFDVCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUEzQmUsd0JBQWdCLG1CQTJCL0IsQ0FBQTtBQUVELHFDQUE0QyxXQUFxQjtJQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1osWUFBWSxDQUFDLGtDQUFrQyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDSCxDQUFDO0FBSmUsbUNBQTJCLDhCQUkxQyxDQUFBO0FBRUQsa0NBQXlDLFdBQXFCO0lBQzVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWixZQUFZLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDOUUsQ0FBQztBQUNILENBQUM7QUFKZSxnQ0FBd0IsMkJBSXZDLENBQUEifQ==