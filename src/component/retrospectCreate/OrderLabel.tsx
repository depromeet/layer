import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type OrderLabelProps = { order?: number };

export function OrderLabel({ order }: OrderLabelProps) {
  return (
    <div
      css={css`
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: ${DESIGN_SYSTEM_COLOR["themeBackground"]["dark"]};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {order && (
        <Typography variant={"OVERLINE"} color={"white"}>
          {order}
        </Typography>
      )}
    </div>
  );
}
