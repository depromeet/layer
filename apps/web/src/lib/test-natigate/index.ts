/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useNavigate } from "react-router-dom";

import { useBridge } from "@/lib/provider/bridge-provider";

const useTestNavigate = () => {
  const { bridge } = useBridge();
  const navigate = useNavigate();
  return bridge.isWebViewBridgeAvailable && bridge?.navigate ? bridge.navigate : navigate;
};

export { useTestNavigate };
