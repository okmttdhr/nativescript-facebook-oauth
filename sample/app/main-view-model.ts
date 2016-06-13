import application = require("application");
import observable = require("data/observable");
const FacebookLoginHandler = require("nativescript-facebook-oauth").FacebookLoginHandler;

export class HelloWorldModel extends observable.Observable {
    constructor() {
        super();
    }

    successCallback(result) {
        console.log(result.token);
    };

    cancelCallback() {
        console.log("Login was cancelled");
    };

    failCallback(error) {
        console.log(error);
    };

    public login() {
        const facebookLoginHandler = new FacebookLoginHandler();
        facebookLoginHandler.init();
        facebookLoginHandler.registerCallback(this.successCallback, this.cancelCallback, this.failCallback);
        facebookLoginHandler.logInWithReadPermissions(["email"]);
    }
}
