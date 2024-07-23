import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TagProps = {
  children: React.ReactNode;
  styles?: Interpolation<Theme>;
  size?: "default" | "md";
};

export function Tag({ children, styles, size = "default" }: TagProps) {
  return (
    <div
      css={[
        css`
          background-color: ${DESIGN_SYSTEM_COLOR["lightGrey2"]};
          border-radius: ${size === "default" ? "0.4rem" : ".8rem"};
          padding: ${size === "default" ? "0.4rem 0.8rem" : "1.2rem 1.6rem"};
          width: fit-content;
        `,
        styles,
      ]}
    >
      {/**FIXME - bold 적용 안돼있음 */}
      <Typography variant={size === "default" ? "CAPTION" : "B2"} color={"darkGrayText"}>
        {children}
      </Typography>
    </div>
  );
}
