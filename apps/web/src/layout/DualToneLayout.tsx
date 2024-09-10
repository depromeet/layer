import { css } from "@emotion/react";
import { ReactNode, useEffect, useRef, useState } from "react";

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
  const topCompRef = useRef<HTMLDivElement>(null);
  const [topCompHeight, setTopCompHeight] = useState("0px");

  useEffect(() => {
    if (topCompRef.current) {
      setTopCompHeight(getComputedStyle(topCompRef.current).height);
    }
  }, [TopComp]);
  return (
    <div>
      <div
        css={css`
          --parent-bg-color: ${DESIGN_SYSTEM_COLOR.themeBackground[topTheme]};
          background-color: var(--parent-bg-color);
          position: fixed;
          top: 0;
          width: 100%;
          max-width: 48rem;
          z-index: 999;
        `}
      >
        <AppBar title={title} theme={topTheme} height={height} LeftComp={LeftComp} RightComp={RightComp} />
        {TopComp && (
          <div
            ref={topCompRef}
            css={css`
              padding: 0 2rem;
              margin-top: ${height ?? "var(--app-bar-height)"};
            `}
          >
            {TopComp}
          </div>
        )}
      </div>
      <main
        css={css`
          position: relative;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          height: 100dvh;
          padding: calc(${height ?? "var(--app-bar-height)"} + ${topCompHeight}) 2rem 0 2rem;
          background-color: ${DESIGN_SYSTEM_COLOR.themeBackground[bottomTheme]};
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        {children}
      </main>
    </div>
  );
}
