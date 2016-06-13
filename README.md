# nativescript-facebook-login2

Facebook SDKを使用して、NativeScriptでiOS、Android共にOAuth認証を実現するプラグインです。

## 検証の手順

`sample`以下にサンプルアプリケーションを作成してあります。

## Facebook Applicationの作成

[Facebook developers](https://developers.facebook.com/)で検証用のアプリケーションを作成します。

![](./images/fb_app_create.png)

`basic setup`を選択します。

![](./images/fb_app_create2.png)

`Display Name` `Contact Email` `Category`を入力します。

`Create App ID`でApplicationが作成されます。`Setting`を選択し、`+Add Platform`をクリック、Androidを選択します。

![](./images/fb_app_create3.png)

検証用なので、`Google Play Package Name`だけ入力します。これでApplicationの作成は完了です。

## Application IDの読み込み

Androidの検証では`sample/app/App_Resources/Android/values/strings.xml`の`{your-app-id}`を作成したアプリケーションの`Application ID`に、iOSの検証では`sample/app/App_Resources/iOS/Info.plist`の`{your-app-id}`を作成したアプリケーションの`Application ID`に、`{your-app-name}`をアプリケーションの名前に置き換えてください。

## サンプルアプリの実行

下記コマンドで実行できます。

```
cd sample
tns install
tns platform add [ios | android]
tns run [ios | android]
```
