import application = require("application");
import { connectToFacebookDelegate } from "nativescript-facebook-oauth";

connectToFacebookDelegate();
application.start({ moduleName: "main-page" });
