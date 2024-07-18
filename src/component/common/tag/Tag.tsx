import { css, Interpolation, Theme } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TagProps = {
  children: React.ReactNode;
  styles?: Interpolation<Theme>;
};

export function Tag({ children, styles }: TagProps) {
  return (
    <div
      css={[
        css`
          background-color: ${DESIGN_SYSTEM_COLOR["lightGrey2"]};
          border-radius: 0.4rem;
          padding: 0.4rem 0.8rem;
          width: fit-content;
        `,
        styles,
      ]}
    >
      {/**FIXME - bold 적용 안돼있음 */}
      <Typography variant={"CAPTION"} color={"darkGrayText"}>
        {children}
      </Typography>
    </div>
  );
}
