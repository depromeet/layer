import { css } from "@emotion/react";
import { ReactNode } from "react";

import { AppBar, AppBarProps } from "@/component/common/appBar";

type DefaultLayoutProps = AppBarProps & {
  appBarVisible?: boolean;
  children: ReactNode;
  theme?: string;
};

export function DefaultLayout({ children, title, theme = "#FFFFFF", height, appBarVisible = true, LeftComp, RightComp }: DefaultLayoutProps) {
  return (
    <div
      css={css`
        background-color: ${theme};
      `}
    >
      {appBarVisible && <AppBar title={title} height={height} LeftComp={LeftComp} RightComp={RightComp} />}
      <main
        css={css`
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          min-height: calc(100vh - 4.8rem);
        `}
      >
        {children}
      </main>
    </div>
  );
}
