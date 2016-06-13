import application = require("application");
const FBDelegate = require("nativescript-facebook-login2").FBDelegate;

if (application.ios) {
  application.ios.delegate = FBDelegate;
}

application.start({ moduleName: "main-page" });
