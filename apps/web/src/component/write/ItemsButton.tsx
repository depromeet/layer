import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

export function ItemsButton({ children, ...props }: PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">>) {
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
        {children}
      </Typography>
      <Icon icon={"ic_arrow"} size={1.2} />
    </button>
  );
}
