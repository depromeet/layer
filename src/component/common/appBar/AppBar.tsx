import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export type AppBarProps = {
  title?: React.ReactNode;
  theme?: "dark" | "gray" | "transparent" | "default";
  height?: string;
  LeftComp?: React.ReactNode;
  RightComp?: React.ReactNode;
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
      color={theme === "dark" ? DESIGN_SYSTEM_COLOR.white : DESIGN_SYSTEM_COLOR.black}
    />
  );
}

//FIXME : 디자인 토큰에 따라 색깔 변경, 폰트 수정
export function AppBar({ title, theme = "default", height = "4.8rem", LeftComp = <Back theme={theme} />, RightComp = <div></div> }: AppBarProps) {
  return (
    <>
      <div
        css={css`
          width: 100%;
          max-width: 48rem;
          height: ${height};
          padding: 1.1rem 2rem;
          background-color: ${DESIGN_SYSTEM_COLOR.themeBackground[theme]};
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          box-sizing: border-box;
          z-index: 99;
        `}
      >
        {LeftComp}
        <div
          css={css`
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.8rem;
            color: ${theme === "dark" ? DESIGN_SYSTEM_COLOR.white : DESIGN_SYSTEM_COLOR.black};
            text-align: center;
          `}
        >
          {title}
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
}
