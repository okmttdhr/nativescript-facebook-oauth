import application = require("application");

declare class UIResponder { any; };
declare class UIApplicationDelegate { any; };
declare type UIApplication = any;
declare type NSDictionary = any;
declare const FBSDKApplicationDelegate: any;
declare const FBSDKAppEvents: any;

if (application.ios) {
  class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
      return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
    }
    applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
      return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
    }
    applicationDidBecomeActive(application: UIApplication): void {
      FBSDKAppEvents.activateApp();
    }
  }
  application.ios.delegate = MyDelegate;
}

application.start({ moduleName: "main-page" });
