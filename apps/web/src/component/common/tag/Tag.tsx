import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { getDeviceType } from "@/utils/deviceUtils";

type TagProps = {
  children: React.ReactNode;
  size?: "small" | "default";
  styles?: Interpolation<Theme>;
};

export function Tag({ children, size, styles }: TagProps) {
  const { isDesktop } = getDeviceType();

  const sizeVariant = isDesktop ? (size === "small" ? "caption10Bold" : "body14Bold") : "body12SemiBold";

  return (
    <div
      css={[
        css`
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          border-radius: 0.4rem;
          padding: 0.4rem 0.8rem;
          width: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
        `,
        styles,
      ]}
    >
      <Typography variant={sizeVariant} color={"gray800"}>
        {children}
      </Typography>
    </div>
  );
}
