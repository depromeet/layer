import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

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
          background-color: ${DESIGN_SYSTEM_COLOR.theme}10;
          padding: 1.4rem 1.8rem;
          border-radius: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        `,
        styles,
      ]}
    >
      {/**FIXME - typography design token */}
      <Typography color={"theme2"} variant={"CAPTION"}>
        {header}
      </Typography>
      <Typography color={"theme"} variant={"CAPTION"}>
        {message}
      </Typography>
    </div>
  );
}
