import {
  KakaoFeedTemplate,
  shareFeedTemplate,
} from "@react-native-kakao/share";
import { bridge } from "@webview-bridge/react-native";

const handlePress = () => {};

export const appBridge = bridge({
  async getSafeAreaHeight(): Promise<number> {
    return 1;
  },

  async checkWebview() {
    return true;
  },

  async sendBGColor(color: string) {
    return;
  },

  async sendShareToKakao(template: KakaoFeedTemplate) {
    shareFeedTemplate({
      template: template,
    });
  },
});

export type AppBridge = typeof appBridge;
