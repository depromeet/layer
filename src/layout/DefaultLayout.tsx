import { css } from "@emotion/react";
import { Fragment, ReactNode } from "react";

import { AppBar, AppBarProps } from "@/component/common/appBar";

type DefaultLayoutProps = AppBarProps & {
  appBarVisible?: boolean;
  children: ReactNode;
};

export function DefaultLayout({ children, title, height, appBarVisible = true, LeftComp, RightComp }: DefaultLayoutProps) {
  return (
    <Fragment>
      {appBarVisible && <AppBar title={title} height={height} LeftComp={LeftComp} RightComp={RightComp} />}
      <main
        css={css`
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
        `}
      >
        {children}
      </main>
    </Fragment>
  );
}
