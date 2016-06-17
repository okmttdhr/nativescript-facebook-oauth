import application = require("application");
import observable = require("data/observable");
import { FacebookLoginHandler } from "nativescript-facebook-oauth";

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
        facebookLoginHandler.logInWithReadPermissions(["email"], this.successCallback, this.cancelCallback, this.failCallback);
    }
}
