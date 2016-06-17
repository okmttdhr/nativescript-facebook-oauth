export interface IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithPublishPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithReadPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
}

export class FacebookLoginHandler implements IFacebookLoginHandler {
  init: () => boolean;
  registerCallback: (successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithPublishPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
  logInWithReadPermissions: (permissions: string[], successCallback: (LoginResult) => void, cancelCallback: () => void, failCallback: (LoginError) => void) => void;
}

export function connectToFacebookDelegate(): () => void;
