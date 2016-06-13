import application = require("application");
const FBDelegate = require("nativescript-facebook-oauth").FBDelegate;

if (application.ios) {
  application.ios.delegate = FBDelegate;
}

application.start({ moduleName: "main-page" });
