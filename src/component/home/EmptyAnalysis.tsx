import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
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
      `}
    >
      <Icon icon={"ic_fault_folder"} size={6.4} />
      <Spacing size={1.6} />
      <Typography
        variant={"body16Medium"}
        color={"gray600"}
        css={css`
          width: 100%;
          text-align: center;
        `}
      >
        완료된 회고가 없어요. <br />
        회고를 진행해 분석을 받아보세요!
      </Typography>
      <Spacing size={3.8} />
      <button
        onClick={() => {
          navigate(PATHS.home());
        }}
        css={css`
          width: 100%;
          max-width: 16rem;
          height: 4.8rem;
          border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
          border-radius: 1.2rem;
        `}
      >
        <Typography variant="subtitle16SemiBold" color="gray800">
          회고 진행하러 가기
        </Typography>
      </button>
    </div>
  );
}
