import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import LocalNavigationBar from "@/component/common/LocalNavigationBar";
import { NavigationProvider, useNavigation } from "@/component/common/LocalNavigationBar/context/NavigationContext";
import { Modal } from "@/component/common/Modal";
import DesktopFunnelModal from "@/component/common/Modal/DesktopFunnelModal";
import DesktopActionModal from "@/component/common/Modal/DesktopActionModal";

function DesktopHomeLayoutContent() {
  const { isCollapsed } = useNavigation();

  return (
    <main>
      <LocalNavigationBar />
      <section
        css={css`
          margin-left: calc(${isCollapsed ? "6rem" : "26rem"} + 2.4rem);
          transition: margin-left 0.3s ease-in-out;
        `}
      >
        <Outlet />
      </section>
    </main>
  );
}

export default function DesktopHomeLayout() {
  return (
    <>
      <Modal />
      <DesktopFunnelModal />
      <DesktopActionModal />
      <NavigationProvider>
        <DesktopHomeLayoutContent />
      </NavigationProvider>
    </>
  );
}
