declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY: string;
    readonly EXPO_USE_METRO_WORKSPACE_ROOT: string;
    readonly EXPO_PUBLIC_WEBVIEW_URI: string;
    readonly EXPO_PUBLIC_MIXPANEL_TOKEN: string;
  }
}
