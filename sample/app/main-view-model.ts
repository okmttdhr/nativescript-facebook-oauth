import observable = require("data/observable");

import { topmost } from "ui/frame";
const FacebookLoginHandler = require("nativescript-facebook-login2");

const successCallback = function(result) {
  // Do something with the result, for example get the AccessToken
  let token;
  if (topmost().android) {
    token = result.getAccessToken().getToken();
  } else if (topmost().ios) {
    token = result.token.tokenString;
  }
  console.log(token);
};

const cancelCallback = function() {
  console.log("Login was cancelled");
};

const failCallback = function(error) {
  let errorMessage = "Error with Facebook";
 // Try to get as much information as possible from error
 if (error) {
      if (topmost().ios) {
          if (error.localizedDescription) {
              errorMessage += ": " + error.localizedDescription;
          }
          else if (error.code) {
              errorMessage += ": Code " + error.code;
          }
          else {
              errorMessage += ": " + error;
          }
      }
      else if (topmost().android) {
          if (error.getErrorMessage) {
              errorMessage += ": " + error.getErrorMessage();
          }
          else if (error.getErrorCode) {
              errorMessage += ": Code " + error.getErrorCode();
          }
          else {
              errorMessage += ": " + error;
          }
      }
  }
  console.log(errorMessage);
};

export class HelloWorldModel extends observable.Observable {

    private _counter: number;
    private _message: string;

    get message(): string {
        return this._message;
    }
    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        } else {
            this.message = this._counter + " taps left";
        }
    }

    public onTap() {
        this._counter--;
        this.updateMessage();

        if (topmost().ios) {
          FacebookLoginHandler.init(2);
        } else if (topmost().android) {
          FacebookLoginHandler.init();
        }
        // Register our callbacks
        FacebookLoginHandler.registerCallback(successCallback, cancelCallback, failCallback);
        // Start the login process
        FacebookLoginHandler.logInWithPublishPermissions(["publish_actions"]);
    }
}
