import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type GoMakeReviewButtonProps = {
  onClick: () => void;
};

export function GoMakeReviewButton({ onClick }: GoMakeReviewButtonProps) {
  return (
    <>
      <div
        css={css`
          width: 100%;
          height: 7.4rem;
          background-color: #ffffff;
          box-shadow: 0.4rem, #2125290a;
          border-radius: 1rem;
          padding: 1.6rem 1.1rem;
          margin-top: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.6rem;
          align-items: center;
        `}
      >
        <button
          css={css`
            width: 4.2rem;
            height: 4.2rem;
            background-color: #f5f7f9;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
          `}
          onClick={onClick}
        >
          <Icon icon="ic_plus" size="1.6rem" />
        </button>
        <Typography variant="B2" color="darkGray">
          회고 스페이스 생성
        </Typography>
      </div>
    </>
  );
}
