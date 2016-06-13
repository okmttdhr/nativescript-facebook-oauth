import application = require("application");
import observable = require("data/observable");
const FacebookLoginHandler = require("nativescript-facebook-login2").FacebookLoginHandler;
// import { FacebookLoginHandler } from "nativescript-facebook-login2";

export class HelloWorldModel extends observable.Observable {
    constructor() {
        super();
    }

    successCallback(result) {
        let token;
        if (application.android) {
            token = result.getAccessToken().getToken();
        } else if (application.ios) {
            token = result.token.tokenString;
        }
        console.log(token);
    };

    cancelCallback() {
        console.log("Login was cancelled");
    };

    failCallback(error) {
        let errorMessage = "Error with: ";
        if (!error) {
          return;
        }
        if (application.ios) {
            if (error.localizedDescription) {
                errorMessage += error.localizedDescription;
            } else if (error.code) {
                errorMessage += error.code;
            } else {
                errorMessage += error;
            }
        } else if (application.android) {
            if (error.getErrorMessage) {
                errorMessage += error.getErrorMessage();
            } else if (error.getErrorCode) {
                errorMessage += error.getErrorCode();
            } else {
                errorMessage += error;
            }
        }
        console.log(errorMessage);
    };

    public login() {
        const facebookLoginHandler = new FacebookLoginHandler();
        facebookLoginHandler.init();
        facebookLoginHandler.registerCallback(this.successCallback, this.cancelCallback, this.failCallback);
        facebookLoginHandler.logInWithReadPermissions(["email"]);
    }
}
