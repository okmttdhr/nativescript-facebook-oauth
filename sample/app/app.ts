import application = require("application");
const MyDelegate = require("nativescript-facebook-login2").MyDelegate;

if (application.ios) {
  application.ios.delegate = MyDelegate;
}

application.start({ moduleName: "main-page" });
