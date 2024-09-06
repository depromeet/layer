import { bridge } from "@webview-bridge/react-native";


export const appBridge = bridge({
  async getSafeAreaHeight(): Promise<number> {
    return 1;
  },

  async checkWebview() {
    return true;
  },
});

export type AppBridge = typeof appBridge