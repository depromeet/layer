import { css } from "@emotion/react";
import Hotjar from "@hotjar/browser";
import ChannelService from "@/lib/channel-talk/service";

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Modal } from "@/component/common/Modal";
import { PreventExternalBrowser } from "@/helper/preventExternalBrowser.tsx";
import { useBridge } from "@/lib/provider/bridge-provider";
import { PATHS } from "@layer/shared";
import { trackPageView } from "@/lib/google_analytics";

const siteId = import.meta.env.VITE_HOTJAR_KEY as number;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION as number;

export default function MobileGlobalLayout() {
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

  // 페이지 이동 시 GA에 페이지뷰를 전송해요
  useEffect(() => {
    trackPageView(location.pathname + location.search);
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
      <Modal />
      <PreventExternalBrowser>
        <Outlet />
      </PreventExternalBrowser>
    </div>
  );
}
