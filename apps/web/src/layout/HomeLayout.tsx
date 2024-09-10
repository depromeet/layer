import { Outlet } from "react-router-dom";

import { NavigationBar } from "@/component/home";
import { useBridge } from "@/lib/provider/bridge-provider";

export function HomeLayout() {
  const { isWebView } = useBridge();
  return (
    <div>
      <Outlet />
      {!isWebView && <NavigationBar />}
    </div>
  );
}
