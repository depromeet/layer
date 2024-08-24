/// <reference types="vite/client" />

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
  state?: string;
  nonce?: string;
  usePopup?: boolean;
}

interface Authorization {
  code: string;
  id_token: string;
  state?: string;
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
