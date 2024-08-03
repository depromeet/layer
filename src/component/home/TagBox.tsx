import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";

type TagBoxProps = {
  tagName: string;
};

export function TagBox({ tagName }: TagBoxProps) {
  return (
    <div
      css={css`
        width: auto;
        height: auto;
        background-color: #f1f3f5;
        padding: 0.4rem 0.8rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Typography variant="CAPTION" color="darkGrayText">
        {tagName}
      </Typography>
    </div>
  );
}
