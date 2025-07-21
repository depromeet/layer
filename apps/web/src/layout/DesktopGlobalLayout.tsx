import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import DesktopModal from "@/component/common/Modal/DesktopModal/DesktopModal";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function DesktopGlobalLayout() {
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
      <DesktopModal />
      <Outlet />
    </div>
  );
}
