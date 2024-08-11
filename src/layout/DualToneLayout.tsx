import { css } from "@emotion/react";
import { ReactNode } from "react";

import { AppBar, AppBarProps } from "@/component/common/appBar";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type DualToneLayoutProps = Omit<AppBarProps, "theme"> & {
  topTheme?: AppBarProps["theme"];
  bottomTheme?: AppBarProps["theme"];
  children: ReactNode;
  TopComp?: React.ReactNode;
};

export function DualToneLayout({
  children,
  topTheme = "default",
  bottomTheme = "gray",
  title,
  height,
  LeftComp,
  RightComp,
  TopComp,
}: DualToneLayoutProps) {
  return (
    <div>
      <div
        css={css`
          --parent-bg-color: ${DESIGN_SYSTEM_COLOR.themeBackground[topTheme]};
          background-color: var(--parent-bg-color);
          position: sticky;
          top: 0;
          z-index: 999;
        `}
      >
        <AppBar title={title} theme={topTheme} height={height} LeftComp={LeftComp} RightComp={RightComp} />
        <div
          css={css`
            padding: 0 2rem;
          `}
        >
          {TopComp}
        </div>
      </div>
      <main
        css={css`
          position: relative;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          min-height: calc(100dvh - ${height ?? `6.4rem`});
          background-color: ${DESIGN_SYSTEM_COLOR.themeBackground[bottomTheme]};
        `}
      >
        {children}
      </main>
    </div>
  );
}
