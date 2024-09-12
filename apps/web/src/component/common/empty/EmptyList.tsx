import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

import { Icon } from "@/component/common/Icon";
import { IconType } from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";

type EmptyListProps = {
  title?: React.ReactNode;
  message: React.ReactNode;
  icon: IconType;
  iconSize?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function EmptyList({ title, message, icon, iconSize = 7.2, children, ...props }: PropsWithChildren<EmptyListProps>) {
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
      <Icon icon={icon} size={iconSize} />
      <Typography variant="title18Bold" color={"gray900"}>
        {title}
      </Typography>
      <div
        css={css`
          text-align: center;
        `}
      >
        <Typography variant="body16Medium" color="gray600">
          {message}
        </Typography>
      </div>
      {children}
    </div>
  );
}
