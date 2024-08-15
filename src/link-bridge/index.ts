import { linkBridge } from "@webview-bridge/web";

import { type AppBridge } from "./native";

export const bridge = linkBridge<AppBridge>();
