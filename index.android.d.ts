declare const com: any;

interface AccountKitLoginResult {
  getAccessToken: () => {
    getToken: () => string;
  };
}

interface AccountKitRequestError {
  getErrorMessage: () => string;
  getErrorCode: () => number;
}

interface CallbackManager {
  onActivityResult: (requestCode: number, resultCode: number, data: android.content.Intent) => boolean;
}

interface AndroidAppActivity {
  onActivityResult: (requestCode: number, resultCode: number, data: android.content.Intent) => void;
}

interface LoginManager {
  logOut: () => void;
  registerCallback: (CallbackManager, FacebookCallback) => void;
  logInWithReadPermissions: (activity: AndroidAppActivity, permissions: java.util.IList<string>) => void;
  logInWithPublishPermissions: (activity: AndroidAppActivity, permissions: java.util.IList<string>) => void;
}
