import { Path } from "@layer/shared";
import {
  KakaoFeedTemplate,
  shareFeedTemplate,
} from "@react-native-kakao/share";
import { bridge } from "@webview-bridge/react-native";
import EventEmitter3 from "eventemitter3";

export type SUSPENSE_STATE = { loading: boolean; message?: string };

type POP_ROUTE = { type: "POP" };
type PUSH_ROUTE = { type: "PUSH"; route: Path };

export type ROUTE_EVENT = POP_ROUTE | PUSH_ROUTE;

interface AppEvents {
  SUSPENSE_STATE: (state: SUSPENSE_STATE) => void;
  ROUTE_EVENT: (event: ROUTE_EVENT) => void;
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

  async navigate(path: Path | -1) {
    if (path === -1) {
      eventEmitter.emit("ROUTE_EVENT", { type: "POP" });
    } else {
      eventEmitter.emit("ROUTE_EVENT", { type: "PUSH", route: path });
    }
  },
});

export type AppBridge = typeof appBridge;

export function listenSuspenseChange(fn: AppEvents["SUSPENSE_STATE"]) {
  eventEmitter.on("SUSPENSE_STATE", fn);
  return () => eventEmitter.off("SUSPENSE_STATE", fn);
}

export function listenRouteEvent(fn: AppEvents["ROUTE_EVENT"]) {
  eventEmitter.on("ROUTE_EVENT", fn);
  return () => eventEmitter.off("ROUTE_EVENT", fn);
}
