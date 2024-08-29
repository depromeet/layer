import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type TipCardProps = {
  message: string;
  header?: string;
  styles?: Interpolation<Theme>;
};

export function TipCard({ message, header = "TIP", styles }: TipCardProps) {
  return (
    <div
      css={[
        css`
          background-color: ${DESIGN_TOKEN_COLOR.blue100};
          padding: 1.4rem 1.8rem;
          border-radius: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        `,
        styles,
      ]}
    >
      <Typography variant={"body12SemiBold"} color={"blue600"}>
        {header}
      </Typography>
      <Typography variant={"body12Medium"} color={"blue600"}>
        {message}
      </Typography>
    </div>
  );
}
