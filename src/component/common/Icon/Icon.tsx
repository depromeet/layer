import { css } from "@emotion/react";
import { CSSProperties, memo } from "react";

import * as icons from "@/assets/svgs";

type IconType = keyof typeof icons;

type Props = {
  icon: IconType;
  color?: string;
  size?: string | number;
  onClick?: () => void;
  style?: CSSProperties;
};

const DEFAULT_ICON_COLOR = "#000000";

export const Icon = memo(function Icon({ icon, color = DEFAULT_ICON_COLOR, size = "0.2rem", onClick, style }: Props) {
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
      style={style}
    />
  );
});
