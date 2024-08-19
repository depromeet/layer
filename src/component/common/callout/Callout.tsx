import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

// FIXME: 추후 확장성 고려하여 리팩토링 진행
export function Callout({ title, content }: { title: string; content: string }) {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        border-radius: 1.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.blue50};
        padding: 1.6rem;

        display: flex;
        flex-direction: column;
        row-gap: 1.6rem;
      `}
    >
      <div
        css={css`
          display: flex;
          column-gap: 0.4rem;

          span,
          svg > path {
            fill: ${DESIGN_TOKEN_COLOR.blue600};
            color: ${DESIGN_TOKEN_COLOR.blue600};
          }
        `}
      >
        <Icon
          icon={"ic_info_transparent"}
          css={css`
            color: ${DESIGN_TOKEN_COLOR.blue600};
          `}
        />
        <Typography variant={"title16Bold"} color={"blue600"}>
          {title}
        </Typography>
      </div>
      <Typography variant={"body14Medium"} color={"blue600"}>
        {content}
      </Typography>
    </div>
  );
}
