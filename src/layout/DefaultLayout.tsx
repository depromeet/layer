import { css } from "@emotion/react";
import { Fragment, PropsWithChildren } from "react";
import { AppBar, AppBarProps } from "@/component/common/appBar";

type DefaultLayoutProps = PropsWithChildren<AppBarProps> & {
  appBarVisible?: boolean;
};

export function DefaultLayout({ children, title, appBarVisible = true, LeftComp, RightComp }: DefaultLayoutProps) {
  return (
    <Fragment>
      {appBarVisible && <AppBar title={title} LeftComp={LeftComp} RightComp={RightComp} />}
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
