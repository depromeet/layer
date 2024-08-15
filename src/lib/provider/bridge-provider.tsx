import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { createContext } from "@/lib/create-context";
import { bridge } from "@/link-bridge";

const BRIDGE_PROVIER = "BRIDGE_PROVIER";

interface WebViewBridgeContext {
  safeAreaHeight?: number;
}

const [Provider, useBridgeContext] = createContext<WebViewBridgeContext>(BRIDGE_PROVIER);

const BridgeProvider = ({ children }: PropsWithChildren) => {
  const { data: safeAreaHeight } = useQuery({
    queryKey: ["app", "height"],
    queryFn: bridge.getSafeAreaHeight,
  });
  return <Provider safeAreaHeight={safeAreaHeight}>{children}</Provider>;
};

export { BridgeProvider, useBridgeContext, BRIDGE_PROVIER };
