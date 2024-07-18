import { Outlet } from "react-router-dom";

import { NavigationBar } from "@/component/home";

export function HomePage() {
  return (
    <div>
      <Outlet />
      <NavigationBar />
    </div>
  );
}
