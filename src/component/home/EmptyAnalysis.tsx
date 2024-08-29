import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function EmptyAnalysis() {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        width: 100%;
        height: calc(100vh - 14rem);
        border-radius: 1.2rem;
        box-shadow: shadow100;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: ${ANIMATION.FADE_IN} 0.6s ease;
      `}
    >
      <Icon icon="ic_clock" size={8} />
      <Spacing size={2} />
      <Typography
        variant={"body15Medium"}
        color={"gray600"}
        css={css`
          width: 100%;
          text-align: center;
          line-height: 1.5;
        `}
      >
        완료된 회고가 없어요 <br />
        회고를 진행해 분석을 받아보세요!
      </Typography>
      <Spacing size={3} />
      <button
        onClick={() => {
          navigate(PATHS.home());
        }}
        css={css`
          border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
          border-radius: 1.2rem;
          width: fit-content;
          padding: 1.3rem 3.65rem;
        `}
      >
        <Typography variant="subtitle16SemiBold" color="gray800">
          회고 진행하기
        </Typography>
      </button>
    </div>
  );
}
