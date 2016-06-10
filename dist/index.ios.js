"use strict";
var _isInit = false;
var mCallbackManager;
var loginManager;
function init(loginBehavior) {
    loginManager = FBSDKLoginManager.alloc().init();
    if (loginManager) {
        loginManager.logOut();
        if (loginBehavior) {
            loginManager.loginBehavior = loginBehavior;
        }
        _isInit = true;
        return true;
    }
    else {
        return false;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFFN0IsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLFlBQVksQ0FBQztBQUdqQixjQUFxQixhQUFtQjtJQUV0QyxZQUFZLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUVqQixZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdEIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNsQixZQUFZLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUM3QyxDQUFDO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDYixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2IsQ0FBQztBQUNGLENBQUM7QUFqQmEsWUFBSSxPQWlCakIsQ0FBQTtBQUVILDBCQUFpQyxlQUFvQixFQUFFLGNBQW1CLEVBQUUsWUFBaUI7SUFDekYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNaLGdCQUFnQixHQUFHLFVBQVMsTUFBb0MsRUFBRSxLQUFjO1lBRTlFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixjQUFjLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLFlBQVksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUM7WUFDVCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUE1QmEsd0JBQWdCLG1CQTRCN0IsQ0FBQTtBQUNILHFDQUE0QyxXQUFxQjtJQUM3RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1osWUFBWSxDQUFDLGtDQUFrQyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDSCxDQUFDO0FBSmEsbUNBQTJCLDhCQUl4QyxDQUFBO0FBQ0gsa0NBQXlDLFdBQXFCO0lBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxZQUFZLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDNUUsQ0FBQztBQUNMLENBQUM7QUFKZSxnQ0FBd0IsMkJBSXZDLENBQUEifQ==