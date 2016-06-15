declare const FBSDKApplicationDelegate: {
  sharedInstance: () => {
    applicationDidFinishLaunchingWithOptions: (application: UIApplication, launchOptions: NSDictionary) => boolean;
    applicationOpenURLSourceApplicationAnnotation: (application: UIApplication, url: NSURL, sourceApplication: string, annotation: any) => boolean;
  };
};

declare const FBSDKAppEvents: {
  activateApp: () => void;
};

interface FBSDKAccessToken {
  tokenString: string;
}

interface FBSDKLoginManagerLoginResult {
  isCancelled: boolean;
  token: FBSDKAccessToken;
}

type FBSDKLoginManagerRequestTokenHandler = (result: FBSDKLoginManagerLoginResult, error: NSError) => void;

declare class FBSDKLoginManager {
  logOut: () => void;
  logInWithReadPermissionsHandler: (permissions: string[], callback: FBSDKLoginManagerRequestTokenHandler) => void;
  logInWithPublishPermissionsHandler: (permissions: string[], callback: FBSDKLoginManagerRequestTokenHandler) => void;
}
