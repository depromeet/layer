/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_REST_API_KEY: string;
  readonly VITE_REDIRECT_URI: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
