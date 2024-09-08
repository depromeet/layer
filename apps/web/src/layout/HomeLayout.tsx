import { Outlet } from "react-router-dom";

import { NavigationBar } from "@/component/home";

export function HomeLayout() {
  return (
    <div>
      <Outlet />
      <NavigationBar />
    </div>
  );
}
