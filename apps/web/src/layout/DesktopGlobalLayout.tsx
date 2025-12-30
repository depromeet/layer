import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Modal } from "@/component/common/Modal";
import { PreventExternalBrowser } from "@/helper/preventExternalBrowser";
import { useEffect } from "react";
import ChannelService from "@/lib/channel-talk/service";
import DesktopFunnelModal from "@/component/common/Modal/DesktopFunnelModal";
import DesktopActionModal from "@/component/common/Modal/DesktopActionModal";
import DesktopModal from "@/component/common/Modal/DesktopModal/DesktopModal";

export default function DesktopGlobalLayout() {
  useEffect(() => {
    ChannelService.hideChannelButton();
  }, []);

  return (
    <div
      css={css`
        width: 100vw;
        min-height: 100vh;
        margin: 0 auto;
        box-sizing: border-box;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
      `}
    >
      <Modal />
      <DesktopModal />
      <DesktopFunnelModal />
      <DesktopActionModal />

      <PreventExternalBrowser>
        <Outlet />
      </PreventExternalBrowser>
    </div>
  );
}
