declare module "nativescript-facebook-login2" {
  interface FacebookSdk {
    init: any;
    registerCallback: any;
    logInWithPublishPermissions: any;
  }
  const facebookSdk: FacebookSdk;
  export = facebookSdk;
}
