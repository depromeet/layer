import { css } from "@emotion/react";

import { DESIGN_SYSTEM_TEXT, DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TextTags = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "em" | "small" | "q" | "u";

type TypographyProps = {
  as?: Extract<React.ElementType, TextTags>;
  variant?: keyof typeof DESIGN_SYSTEM_TEXT;
  color?: keyof typeof DESIGN_SYSTEM_COLOR;
  children: React.ReactNode;
};

// FIXME: 디자인 토큰에 따른 default 값 수정
export function Typography({ as: Component = "span", variant = "B1", color = "black", children }: TypographyProps) {
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
