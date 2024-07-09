import { css } from "@emotion/react";
import { Fragment, PropsWithChildren } from "react";
import AppBar from "@/component/AppBar/AppBar";
import { AppBarProps } from "@/component/AppBar/AppBar";

type DefaultLayoutProps = PropsWithChildren & AppBarProps;

export function DefaultLayout({ children, title, appBarVisible, LeftComp, RightComp }: DefaultLayoutProps) {
  return (
    <Fragment>
      <AppBar title={title} appBarVisible={appBarVisible} LeftComp={LeftComp} RightComp={RightComp} />
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