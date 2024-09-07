/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type AppBridge } from "@layer/app";
import { useQuery } from "@tanstack/react-query";
import { linkBridge } from "@webview-bridge/web";
import { PropsWithChildren } from "react";

import { createContext } from "@/lib/create-context";

const BRIDGE_PROVIER = "BRIDGE_PROVIER";

const bridge = linkBridge<AppBridge>();

interface WebViewBridgeContext {
  safeAreaHeight?: number;
  isWebView: boolean;
  bridge: typeof bridge;
}

const [Provider, useBridge] = createContext<WebViewBridgeContext>(BRIDGE_PROVIER);

const BridgeProvider = ({ children }: PropsWithChildren) => {
  const { data: { safeAreaHeight, isWebViewBridgeAvailable } = {} } = useQuery({
    queryKey: ["app", "height"],
    queryFn: async () => {
      const safeAreaHeight = await bridge.getSafeAreaHeight();

      return { safeAreaHeight, isWebViewBridgeAvailable: bridge.isWebViewBridgeAvailable };
    },
  });

  return (
    <Provider bridge={bridge} safeAreaHeight={safeAreaHeight} isWebView={!!isWebViewBridgeAvailable}>
      {children}
    </Provider>
  );
};

export { BridgeProvider, useBridge, BRIDGE_PROVIER };
