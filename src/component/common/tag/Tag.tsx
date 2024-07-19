import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TagProps = {
  children: React.ReactNode;
  styles?: Interpolation<Theme>;
  size?: "default" | "md";
  variant?: "default" | "dark";
};

export function Tag({ children, styles, size = "default", variant = "default" }: TagProps) {
  return (
    <div
      css={[
        css`
          background-color: ${variant === "default" ? DESIGN_SYSTEM_COLOR["lightGrey2"] : DESIGN_SYSTEM_COLOR["dark"]};
          border-radius: ${size === "default" ? "0.4rem" : ".8rem"};
          padding: ${size === "default" ? "0.4rem 0.8rem" : "1.2rem 1.6rem"};
          width: fit-content;
        `,
        styles,
      ]}
    >
      {/**FIXME - bold 적용 안돼있음 */}
      <Typography variant={size === "default" ? "CAPTION" : "B2"} color={variant === "default" ? "darkGrayText" : "lightGrey2"}>
        {children}
      </Typography>
    </div>
  );
}
