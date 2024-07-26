import { css } from "@emotion/react";
import { DraggableStateSnapshot } from "react-beautiful-dnd";

import { OrderLabel } from "@/component/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type QuestionListItemProps = {
  gap?: string;
  order?: number;
  children: React.ReactNode;
  RightComp?: React.ReactNode;
} & React.LiHTMLAttributes<HTMLLIElement> &
  Partial<DraggableStateSnapshot>;

export function QuestionListItem({ gap = "1.2rem", order, RightComp, children, ...props }: QuestionListItemProps) {
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
      {children}
      {RightComp}
    </li>
  );
}
