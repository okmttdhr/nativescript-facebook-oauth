export interface IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: any, cancelCallback: any, failCallback: any) => void;
  logInWithPublishPermissions: (permissions: string[]) => void;
  logInWithReadPermissions: (permissions: string[]) => void;
}

declare module "nativescript-facebook-login2" {
  const facebookLoginHandler: IFacebookLoginHandler;
  export = facebookLoginHandler;
}
