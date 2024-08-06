import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type OrderLabelProps = { order?: number };

export function OrderLabel({ order }: OrderLabelProps) {
  return (
    <div
      css={css`
        flex-shrink: 0;
        width: 2rem;
        height: 2rem;
        border-radius: 3rem;
        background-color: ${DESIGN_SYSTEM_COLOR.grey3};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {order ? (
        <Typography variant={"OVERLINE"} color={"white"}>
          {order}
        </Typography>
      ) : (
        <Icon icon={"ic_star"} color={"white"} size={1} />
      )}
    </div>
  );
}
