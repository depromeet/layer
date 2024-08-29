import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

type ActionItemListProps = {
  contents: string;
};

export function ActionItemList({ contents }: ActionItemListProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 1.2rem;
      `}
    >
      <div
        css={css`
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 100%;
          background: ${DESIGN_TOKEN_COLOR.gray400};
        `}
      />
      <Typography variant={"body16Medium"}> {contents} </Typography>
    </div>
  );
}
