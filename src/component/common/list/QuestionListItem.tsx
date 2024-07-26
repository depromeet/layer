import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { DraggableStateSnapshot } from "react-beautiful-dnd";

import { Typography } from "@/component/common/typography";
import { OrderLabel } from "@/component/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type QuestionListItemProps = {
  gap?: string;
  order?: number;
  content?: string;
  RightComp?: React.ReactNode;
} & React.LiHTMLAttributes<HTMLLIElement> &
  Partial<DraggableStateSnapshot>;

export function QuestionListItem({ gap = "1.2rem", order, RightComp, content, children, ...props }: PropsWithChildren<QuestionListItemProps>) {
  return (
    <li
      css={css`
        background-color: ${DESIGN_SYSTEM_COLOR["themeBackground"]["gray"]};
        padding: 1.5rem 1.2rem;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        gap: ${gap};
        box-shadow: ${props.isDragging ? "0 .3rem .2rem rgba(0, 0, 0, 0.105)" : ""};
      `}
    >
      <OrderLabel order={order} />
      {content && (
        <Typography color="dark" variant="B2">
          {content}
        </Typography>
      )}
      {children}
      {RightComp}
    </li>
  );
}
