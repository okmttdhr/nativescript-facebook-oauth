"use strict";
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
        if (this.isInit) {
            this.callbackManager = function (result, error) {
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
    };
    FacebookLoginHandler.prototype.logInWithPublishPermissions = function (permissions) {
        if (this.isInit) {
            this.loginManager.logInWithPublishPermissionsHandler(permissions, this.callbackManager);
        }
    };
    FacebookLoginHandler.prototype.logInWithReadPermissions = function (permissions) {
        if (this.isInit) {
            this.loginManager.logInWithReadPermissionsHandler(permissions, this.callbackManager);
        }
    };
    return FacebookLoginHandler;
}());
exports.FacebookLoginHandler = FacebookLoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW5kZXguaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUFBO1FBQ1UsV0FBTSxHQUFZLEtBQUssQ0FBQztJQXFEbEMsQ0FBQztJQWxEUSxtQ0FBSSxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVNLCtDQUFnQixHQUF2QixVQUF3QixlQUFvQixFQUFFLGNBQW1CLEVBQUUsWUFBaUI7UUFDbEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFTLE1BQW9DLEVBQUUsS0FBYztnQkFDbEYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BCLE1BQU0sQ0FBQztnQkFDVCxDQUFDO2dCQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDWixZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzNCLE1BQU0sQ0FBQztnQkFDVCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN2QixjQUFjLEVBQUUsQ0FBQztvQkFDakIsTUFBTSxDQUFDO2dCQUNULENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixZQUFZLENBQUMsbUNBQW1DLENBQUMsQ0FBQztvQkFDbEQsTUFBTSxDQUFDO2dCQUNULENBQUM7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUVNLDBEQUEyQixHQUFsQyxVQUFtQyxXQUFxQjtRQUN0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLGtDQUFrQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUYsQ0FBQztJQUNILENBQUM7SUFFTSx1REFBd0IsR0FBL0IsVUFBZ0MsV0FBcUI7UUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7SUFDSCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDO0FBdERZLDRCQUFvQix1QkFzRGhDLENBQUEifQ==