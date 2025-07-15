import { Outlet } from "react-router-dom";

import { LocalNavigationBar } from "@/component/common/localNavigationBar";

export default function DesktopHomeLayout() {
  return (
    <main>
      <LocalNavigationBar />
      <Outlet />
    </main>
  );
}
