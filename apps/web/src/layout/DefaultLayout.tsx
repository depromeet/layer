import { css } from "@emotion/react";
import { ReactNode, useEffect, useState } from "react";

import { AppBar, AppBarProps } from "@/component/common/appBar";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { getDeviceType } from "@/utils/deviceUtils";

type DefaultLayoutProps = AppBarProps & {
  appBarVisible?: boolean;
  children: ReactNode;
};

export function DefaultLayout({ children, title, theme = "default", height, appBarVisible = true, LeftComp, RightComp }: DefaultLayoutProps) {
  const { isMobile } = getDeviceType();
  const [initialHeight, setInitialHeight] = useState("100dvh"); // default device type : mobile

  useEffect(() => {
    setInitialHeight(isMobile ? "100dvh" : "100%");
  }, [isMobile]);

  return (
    <div
      css={css`
        --parent-bg-color: ${DESIGN_TOKEN_COLOR.themeBackground[theme]};
        background-color: var(--parent-bg-color);
        overflow-y: auto;
        height: 100%;
        max-height: 100dvh;
      `}
    >
      {appBarVisible && <AppBar title={title} theme={theme} height={height} LeftComp={LeftComp} RightComp={RightComp} />}
      <main
        css={css`
          position: relative;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          height: ${initialHeight};
          padding: ${height ?? "var(--app-bar-height)"} 2rem 0 2rem;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        {children}
      </main>
    </div>
  );
}
