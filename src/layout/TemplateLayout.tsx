import { css } from "@emotion/react";
import { forwardRef, ReactNode } from "react";

import { AppBarProps, AppBar } from "@/component/common/appBar";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type DefaultLayoutProps = AppBarProps & {
  children: ReactNode;
};

export const TemplateLayout = forwardRef<HTMLDivElement, DefaultLayoutProps>(function (
  { children, title, theme = "default", height, LeftComp, RightComp },
  ref,
) {
  return (
    <div
      css={css`
        --parent-bg-color: #fff;
        background-color: ${DESIGN_SYSTEM_COLOR.themeBackground[theme]};
        transition: 0.4s all;
      `}
    >
      <div
        css={css`
          position: relative;
          background: #212329;
          top: 0;
          height: 27rem;
        `}
      >
        <AppBar
          title={title}
          theme={theme}
          height={height}
          LeftComp={LeftComp}
          RightComp={RightComp}
          ref={ref}
          css={css`
            position: absolute;
          `}
        />
      </div>
      <main
        css={css`
          position: relative;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          min-height: calc(100dvh - ${height ?? `5.8rem`});
        `}
      >
        {children}
      </main>
    </div>
  );
});

TemplateLayout.displayName = "TemplateLayout";
