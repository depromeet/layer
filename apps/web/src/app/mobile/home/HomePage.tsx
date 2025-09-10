import { Outlet } from "react-router-dom";

import { NavigationBar } from "@/component/home";

// TODO: 사용되지 않는 코드, 추후 제거
export function HomePage() {
  return (
    <div>
      <Outlet />
      <NavigationBar />
    </div>
  );
}
