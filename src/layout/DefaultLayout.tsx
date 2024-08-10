import { css } from "@emotion/react";
import { ReactNode } from "react";

import { AppBar, AppBarProps } from "@/component/common/appBar";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type DefaultLayoutProps = AppBarProps & {
  appBarVisible?: boolean;
  children: ReactNode;
};

export function DefaultLayout({ children, title, theme = "default", height, appBarVisible = true, LeftComp, RightComp }: DefaultLayoutProps) {
  return (
    <div
      css={css`
        --parent-bg-color: ${DESIGN_SYSTEM_COLOR.themeBackground[theme]};
        background-color: var(--parent-bg-color);
        overflow-y: auto;
        max-height: 100vh;
      `}
    >
      {appBarVisible && <AppBar title={title} theme={theme} height={height} LeftComp={LeftComp} RightComp={RightComp} />}
      <main
        css={css`
          position: relative;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          height: calc(100dvh - ${height ?? `5.8rem`});
        `}
      >
        {children}
      </main>
    </div>
  );
}
