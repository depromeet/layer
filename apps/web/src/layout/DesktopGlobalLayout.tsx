import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Modal } from "@/component/common/Modal";
import { PreventExternalBrowser } from "@/helper/preventExternalBrowser";

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
      {/* #444에서 작업한 새로운 모달 프레임 추가 */}
      <Modal />
      <PreventExternalBrowser>
        <Outlet />
      </PreventExternalBrowser>
    </div>
  );
}
