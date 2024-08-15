import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { createContext } from "@/lib/create-context";
import { bridge } from "@/link-bridge";

const BRIDGE_PROVIER = "BRIDGE_PROVIER";

interface WebViewBridgeContext {
  safeAreaHeight?: number;
  isWebView: boolean;
}

const [Provider, useBridgeContext] = createContext<WebViewBridgeContext>(BRIDGE_PROVIER);

const BridgeProvider = ({ children }: PropsWithChildren) => {
  const { data: { isWebview, safeAreaHeight } = {} } = useQuery({
    queryKey: ["app", "height"],
    queryFn: async () => {
      const safeAreaHeight = await bridge.getSafeAreaHeight();
      const isWebview = await bridge.checkWebview();

      return { safeAreaHeight, isWebview };
    },
  });
  return (
    <Provider safeAreaHeight={safeAreaHeight} isWebView={!!isWebview}>
      {children}
    </Provider>
  );
};

export { BridgeProvider, useBridgeContext, BRIDGE_PROVIER };
