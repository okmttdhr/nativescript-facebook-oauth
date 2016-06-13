import application = require("application");
import observable = require("data/observable");
const FacebookLoginHandler = require("nativescript-facebook-login2").FacebookLoginHandler;
// import { FacebookLoginHandler } from "nativescript-facebook-login2";

const successCallback = function(result) {
    let token;
    if (application.android) {
        token = result.getAccessToken().getToken();
    } else if (application.ios) {
        token = result.token.tokenString;
    }
    console.log(token);
};

const cancelCallback = function() {
    console.log("Login was cancelled");
};

const failCallback = function(error) {
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

export class HelloWorldModel extends observable.Observable {
    constructor() {
        super();
    }

    public login() {
        const facebookLoginHandler = new FacebookLoginHandler();
        facebookLoginHandler.init();
        facebookLoginHandler.registerCallback(successCallback, cancelCallback, failCallback);
        facebookLoginHandler.logInWithReadPermissions(["email"]);
    }
}
