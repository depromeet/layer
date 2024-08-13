import { css, Interpolation, Theme } from "@emotion/react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export type AppBarProps = {
  title?: React.ReactNode;
  theme?: "dark" | "gray" | "transparent" | "default";
  height?: string;
  LeftComp?: React.ReactNode;
  RightComp?: React.ReactNode;
  style?: Interpolation<Theme>;
};

//FIXME: 색깔 디자인 토큰에 따라 변경
function Back({ theme }: { theme: "dark" | "gray" | "default" | "transparent" }) {
  const navigate = useNavigate();
  return (
    <Icon
      icon="ic_arrow_left"
      onClick={() => {
        navigate(-1);
      }}
      color={theme === "dark" ? DESIGN_TOKEN_COLOR.gray00 : DESIGN_TOKEN_COLOR.gray900}
    />
  );
}

//FIXME : 디자인 토큰에 따라 색깔 변경, 폰트 수정
export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function (
  { style, title, theme = "default", height = "5.8rem", LeftComp = <Back theme={theme} />, RightComp = <div></div> },
  ref,
) {
  return (
    <>
      <div
        css={[css`
          width: 100%;
          max-width: 48rem;
          height: ${height};
          padding: 1.1rem 2rem;
          background-color: ${DESIGN_TOKEN_COLOR.themeBackground[theme]};
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          box-sizing: border-box;
          z-index: 99;
          transition: 0.4s all;
        `,
              style,
         ]}
        ref = {ref}
      >
        {LeftComp}
        <div
          css={css`
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          `}
        >
          <Typography
            color={theme === "dark" ? "white" : "gray900"}
            variant="subtitle18SemiBold"
            css={css`
              text-align: center;
            `}
          >
            {title}
          </Typography>
        </div>
        {RightComp}
      </div>
      <div
        css={css`
          width: 100%;
          height: ${height};
        `}
      />
    </>
  );
});

AppBar.displayName = "AppBar";
