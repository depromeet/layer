import { css } from "@emotion/react";
import { ReactNode } from "react";

import { AppBar, AppBarProps } from "@/component/common/appBar";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type DefaultLayoutProps = AppBarProps & {
  appBarVisible?: boolean;
  children: ReactNode;
};

export function DefaultLayout({ children, title, theme = "default", height, appBarVisible = true, LeftComp, RightComp }: DefaultLayoutProps) {
  return (
    <div
      css={css`
        --parent-bg-color: ${DESIGN_TOKEN_COLOR.themeBackground[theme]};
        background-color: var(--parent-bg-color);
        overflow-y: auto;
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
          height: 100dvh;
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
