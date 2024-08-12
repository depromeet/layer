import { css } from "@emotion/react";

type PurposeBoxType = {
  purpose: string;
};

export function PurposeBox({ purpose }: PurposeBoxType) {
  return (
    <div
      css={css`
        border-radius: 0.8rem;
        background: #e9f0ff;
        padding: 1.4rem 2rem;
        width: fit-content;
        color: #454952;
      `}
    >
      {purpose}
    </div>
  );
}
