import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

type ToolTipProps = {
  isVisible: boolean;
  title: string;
  contents: string;
  handleClose: () => void;
};

export function ToolTip({ isVisible, title, contents, handleClose }: ToolTipProps) {
  return (
    // 부모 요소에 relative 속성이 적용되어있어야해요
    // TODO: 추후 공통 컴포넌트화 진행, 현재는 한 화면에서만 사용되고 있음
    <div
      id={"analysis-tooltip"}
      css={css`
        position: absolute;
        width: 26.6rem;
        bottom: 0;
        margin-bottom: 4rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray900};
        animation: ${ANIMATION.FADE_UP} ease 0.4s;
        padding: 1.2rem 1.4rem;
        border-radius: 0.8rem;

        display: ${isVisible ? "flex" : "none"};
        flex-direction: column;
        row-gap: 1rem;

        ::after {
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 0 0 0.2rem 0.2rem;
          visibility: visible;
          background-color: inherit;
          bottom: -0.4rem;
          content: "";
          transform: rotate(45deg);
          transition:
            opacity 0.2s ease,
            visibility 0.2s ease;
        }
      `}
    >
      <div
        id={"header"}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Typography variant={"subtitle14SemiBold"} color={"gray00"}>
          {title}
        </Typography>
        <Icon
          icon={"ic_write_quit"}
          size={1}
          css={css`
            path {
              stroke: ${DESIGN_TOKEN_COLOR.gray100};
            }
            margin-left: auto;
          `}
          onClick={handleClose}
        />
      </div>
      <div id={"content"}>
        <Typography color={"gray300"} variant={"body12Medium"}>
          {contents}
        </Typography>
      </div>
    </div>
  );
}
