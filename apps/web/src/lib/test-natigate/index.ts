/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useNavigate } from "react-router-dom";

import { useBridge } from "@/lib/provider/bridge-provider";

const useTestNatigate = () => {
  const { isWebView, bridge } = useBridge();
  const navigate = useNavigate();

  return isWebView && bridge?.navigate ? bridge.navigate : navigate;
};

export { useTestNatigate };
