import {
  KakaoFeedTemplate,
  shareFeedTemplate,
} from "@react-native-kakao/share";
import { bridge } from "@webview-bridge/react-native";
import EventEmitter3 from "eventemitter3";

export type SUSPENSE_STATE = { loading: boolean; message?: string };

interface AppEvents {
  SUSPENSE_STATE: (state: SUSPENSE_STATE) => void;
}

const eventEmitter = new EventEmitter3<AppEvents>();

export const appBridge = bridge({
  async getSafeAreaHeight(): Promise<number> {
    return 1;
  },

  async checkWebview() {
    return true;
  },

  async sendBGColor(color: string) {
    console.log(color);
    return;
  },

  async setSuspenseState(state: SUSPENSE_STATE) {
    eventEmitter.emit("SUSPENSE_STATE", state);
  },

  async sendShareToKakao(template: KakaoFeedTemplate) {
    shareFeedTemplate({
      template: template,
    });
  },
});

export type AppBridge = typeof appBridge;

export function listenSuspenseChange(fn: AppEvents["SUSPENSE_STATE"]) {
  eventEmitter.on("SUSPENSE_STATE", fn);
  return () => eventEmitter.off("SUSPENSE_STATE", fn);
}
