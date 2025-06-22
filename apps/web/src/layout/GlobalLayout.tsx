import { css } from "@emotion/react";
import Hotjar from "@hotjar/browser";
import { PATHS } from "@layer/shared";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Modal } from "@/component/common/Modal";
import { PreventExternalBrowser } from "@/helper/preventExternalBrowser.tsx";
import ChannelService from "@/lib/channel-talk/service";
import { useBridge } from "@/lib/provider/bridge-provider";
import { ModalManager } from "@/component/common/ModalManager/ModalManager";

const siteId = import.meta.env.VITE_HOTJAR_KEY as number;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION as number;

export default function GlobalLayout() {
  const location = useLocation();
  const { safeAreaHeight } = useBridge();

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith(PATHS.myInfo())) {
      ChannelService.showChannelButton();
    } else {
      ChannelService.hideChannelButton();
    }
  }, [location]);

  return (
    <div
      css={css`
        width: 100vw;
        max-width: 48rem;
        min-height: 100dvh;
        box-shadow:
          0 0.1rem 0.3rem 0 rgb(0 0 0 / 0.1),
          0 0.1rem 0.2rem -0.1rem rgb(0 0 0 / 0.1);
        margin: 0 auto;

        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        ${safeAreaHeight && { height: `calc(100dvh-${safeAreaHeight * 2}px)` }}
      `}
    >
      <ModalManager />
      <PreventExternalBrowser>
        <Outlet />
      </PreventExternalBrowser>
    </div>
  );
}
