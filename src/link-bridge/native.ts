import { bridge } from "@webview-bridge/react-native";

export const appBridge = bridge({
  async getSafeAreaHeight() {
    return new Promise<number>((resolve) => resolve(1));
  },

  async checkWebview(): Promise<boolean> {
    return new Promise<boolean>((resolve) => resolve(false));
  },
});
export type AppBridge = typeof appBridge;
