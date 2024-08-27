import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type EmptyListProps = {
  message: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function EmptyList({ message, ...props }: EmptyListProps) {
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
      `}
      {...props}
    >
      <Icon icon="ic_clock" size={7.2} />
      <div
        css={css`
          text-align: center;
        `}
      >
        <Typography variant="body16Medium" color="gray600">
          {message}
        </Typography>
      </div>
    </div>
  );
}
