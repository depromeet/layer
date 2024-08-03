import { css } from "@emotion/react";

import { Button, ButtonProps } from "@/component/common/button/Button";
import { Icon, IconType } from "@/component/common/Icon/Icon";

type IconButtonProps = {
  icon: IconType;
} & ButtonProps;

export function IconButton({ icon, children, ...props }: IconButtonProps) {
  return (
    <Button
      css={css`
        position: relative;
      `}
      {...props}
    >
      <Icon
        icon={icon}
        css={css`
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
        `}
      />
      {children}
    </Button>
  );
}
