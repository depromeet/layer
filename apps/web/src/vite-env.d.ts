/// <reference types="vite/client" />

declare const APP_VERSION: string;

type ImportMetaEnv = {
  readonly VITE_REST_API_KEY: string;
  readonly VITE_REDIRECT_URI: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Kakao: any;
  AppleID: {
    auth: {
      init: (config: ClientConfig) => void;
      signIn: (config?: ClientConfig) => Promise<SigninResponse>;
    };
  };
}

// apple config
interface ClientConfig {
  clientId: string;
  redirectURI: string;
  scope?: string;
  state: string;
  nonce?: string;
  usePopup?: boolean;
}

interface Authorization {
  code: string;
  id_token: string;
  state: string;
}

interface User {
  email: string;
  name: string;
}

interface SigninResponse {
  authorization: Authorization;
  user?: User;
}

interface SigninError {
  error: string;
}

declare const webkit: Webkit;

interface Window {
  webkit: Webkit;
  /**
   * A convenience API that we seem to expose in iOS.
   * Not sure whether Android does the same.
   * @see: https://github.com/react-native-community/react-native-webview/blob/25552977852427cf5fdc7b233fd1bbc7c77c18b0/ios/RNCWebView.m#L1128-L1146
   */
  ReactNativeWebView: {
    postMessage(msg: string): void;
  };
}

interface Webkit {
  messageHandlers: {
    /**
     * Added due to our call to addScriptMessageHandler.
     * @see: https://github.com/react-native-community/react-native-webview/blob/25552977852427cf5fdc7b233fd1bbc7c77c18b0/ios/RNCWebView.m#L1244
     */
    ReactNativeWebView: {
      postMessage(message: string): void;
    };
    /**
     * Added due to our call to addScriptMessageHandler.
     * @see: https://github.com/react-native-community/react-native-webview/blob/25552977852427cf5fdc7b233fd1bbc7c77c18b0/ios/RNCWebView.m#L214
     */
    ReactNativeHistoryShim: {
      postMessage(message: string): void;
    };
  };
}
