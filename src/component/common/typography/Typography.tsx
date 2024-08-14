import { css } from "@emotion/react";

import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { DESIGN_SYSTEM_TEXT, DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TextTags = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "em" | "small" | "q" | "u";

export type TypographyProps = {
  as?: Extract<React.ElementType, TextTags>;
  variant?: keyof typeof DESIGN_SYSTEM_TEXT | keyof typeof DESIGN_TOKEN_TEXT;
  color?: keyof typeof DESIGN_SYSTEM_COLOR | keyof typeof DESIGN_TOKEN_COLOR;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "color" | "as" | "variant">;

export function Typography({ as: Component = "span", variant = "caption10Medium", color = "gray900", children, ...props }: TypographyProps) {
  return (
    <Component
      css={css`
        ${{ ...DESIGN_SYSTEM_TEXT, ...DESIGN_TOKEN_TEXT }[variant]}
        color: ${{ ...DESIGN_SYSTEM_COLOR, ...DESIGN_TOKEN_COLOR }[color]};
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
