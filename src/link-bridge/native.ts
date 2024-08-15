import { bridge } from "@webview-bridge/react-native";

export const appBridge = bridge({
  async getSafeAreaHeight() {
    return new Promise<number>((resolve) => resolve(1));
  },
});
export type AppBridge = typeof appBridge;
