import application = require("application");
const connectToFacebookDelegate = require("nativescript-facebook-oauth").connectToFacebookDelegate;

connectToFacebookDelegate();
application.start({ moduleName: "main-page" });
