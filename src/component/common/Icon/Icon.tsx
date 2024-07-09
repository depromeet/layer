import { memo } from "react";

import * as icons from "@/assets/svgs";
import { css } from "@emotion/react";

type IconType = keyof typeof icons;

type Props = {
  icon: IconType;
  color?: string;
  size?: string | number;
  onClick?: () => void;
};

const DEFAULT_ICON_COLOR = "#000000";

function icon({ icon, color = DEFAULT_ICON_COLOR, size = "0.2rem", onClick }: Props) {
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
    />
  );
}

export default memo(icon);
