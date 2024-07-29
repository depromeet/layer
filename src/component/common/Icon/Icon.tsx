import { css } from "@emotion/react";
import { memo } from "react";

import * as icons from "@/assets/svgs";

export type IconType = keyof typeof icons;

type Props = {
  icon: IconType;
  color?: string;
  size?: string | number;
  onClick?: () => void;
} & React.SVGProps<SVGSVGElement>;

const DEFAULT_ICON_COLOR = "#000000";

export const Icon = memo(function Icon({ icon, color = DEFAULT_ICON_COLOR, size = "2rem", onClick, ...props }: Props) {
  // eslint-disable-next-line import/namespace
  const SVGIcon = icons[icon];
  const widthRem = typeof size === "number" ? `${size}rem` : size;

  return (
    <SVGIcon
      onClick={onClick}
      css={css`
        color: ${color};
        cursor: ${onClick ? "pointer" : "default"};
        width: ${widthRem};
        height: auto;
      `}
      {...props}
    />
  );
});
