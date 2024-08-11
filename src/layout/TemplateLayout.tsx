import { css } from "@emotion/react";
import { Children, cloneElement, forwardRef, isValidElement, PropsWithChildren, ReactElement } from "react";

import { AppBarProps, AppBar } from "@/component/common/appBar";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

const Header = forwardRef<HTMLDivElement, PropsWithChildren<AppBarProps>>(function (
  { title, theme, height, LeftComp, RightComp, children, ...props },
  ref,
) {
  return (
    <div
      id="header"
      css={css`
        position: relative;
        background: #212329;
        top: 0;
        height: auto;
        min-height: 27rem;
      `}
    >
      <AppBar
        ref={ref}
        title={title}
        theme={theme}
        height={height}
        LeftComp={LeftComp}
        RightComp={RightComp}
        css={css`
          position: absolute;
        `}
        {...props}
      />
      {children}
    </div>
  );
});

const Main = ({ height, children, ...props }: PropsWithChildren<{ height?: string }>) => (
  <main
    id="main"
    css={css`
      position: relative;
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      padding: 0 2rem;
      min-height: calc(100dvh - ${height ?? `5.8rem`});
    `}
    {...props}
  >
    {children}
  </main>
);

export function TemplateLayout({ theme = "transparent", height = "5.8rem", children, ...props }: PropsWithChildren<AppBarProps>) {
  return (
    <div
      css={css`
        --parent-bg-color: #fff;
        background-color: ${DESIGN_SYSTEM_COLOR.themeBackground[theme]};
        transition: 0.4s all;
      `}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement, { ...props, theme, height });
        }
      })}
    </div>
  );
}

TemplateLayout.Header = Header;
TemplateLayout.Main = Main;

Header.displayName = "Header";
