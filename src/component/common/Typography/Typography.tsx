import React from "react";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_TEXT } from "@/style/variable";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TypographyProps = {
  as?: React.ElementType;
  variant?: keyof typeof DESIGN_SYSTEM_TEXT;
  color?: keyof typeof DESIGN_SYSTEM_COLOR;
  children: string;
};

// FIXME: 디자인 토큰에 따른 default 값 수정
function Typography({ as: Component = "span", variant = "B1", color = "black", children }: TypographyProps) {
  return (
    <Component
      css={css`
        ${DESIGN_SYSTEM_TEXT[variant]}
        color: ${DESIGN_SYSTEM_COLOR[color]};
      `}
    >
      {children}
    </Component>
  );
}

export { Typography };
