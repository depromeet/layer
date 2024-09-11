import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { EmptySpaceTooltip } from "../space/view/EmptySpaceTooltip";

type GoMakeReviewButtonProps = {
  onClick: () => void;
  isTooltipVisible: boolean;
};

export function GoMakeReviewButton({ onClick, isTooltipVisible }: GoMakeReviewButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        css={css`
          width: 100%;
          height: 7.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
          border-radius: 1rem;
          padding: 1.6rem 1.1rem;
          margin-top: 1.6rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.6rem;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 4.2rem;
            height: 4.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
          `}
        >
          <Icon icon="ic_plus" size="1.6rem" color={DESIGN_TOKEN_COLOR.gray600} />
        </div>
        <Typography variant="body14Medium" color="gray600">
          회고 스페이스 생성
        </Typography>
        {isTooltipVisible && <EmptySpaceTooltip />}
      </button>
    </>
  );
}
