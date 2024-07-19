import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { OrderLabel } from "@/component/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type QuestionListItemProps = {
  gap?: string;
  order?: number;
  children: React.ReactNode;
  RightComp?: React.ReactNode;
};

export function QuestionListItem({ gap = "1.2rem", order, RightComp, children }: QuestionListItemProps) {
  return (
    <li
      css={css`
        background-color: ${DESIGN_SYSTEM_COLOR["themeBackground"]["gray"]};
        padding: 1.5rem 1.2rem;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        gap: ${gap};
      `}
    >
      <OrderLabel order={order} />
      {children}
      {RightComp}
    </li>
  );
}
