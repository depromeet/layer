import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type TagProps = {
  children: React.ReactNode;
  styles?: Interpolation<Theme>;
};

export function Tag({ children, styles }: TagProps) {
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
      <Typography variant={"body12SemiBold"} color={"gray800"}>
        {children}
      </Typography>
    </div>
  );
}
