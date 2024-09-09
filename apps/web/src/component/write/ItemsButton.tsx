import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type ItemsButtonProps = {
  title: string | React.ReactElement;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, "type">;

export function ItemsButton({ title = "질문 전체보기", ...props }: ItemsButtonProps) {
  return (
    <button
      css={css`
        min-height: 4.2rem;
        width: fit-content;
        padding: 0.9rem 1.5rem;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1.2rem;

        background-color: #f6f8fa;
        border-radius: 1.2rem;
      `}
      {...props}
    >
      <Typography color={"gray900"} variant={"subtitle16SemiBold"}>
        {title}
      </Typography>
      <Icon icon={"ic_arrow"} size={1.2} />
    </button>
  );
}
