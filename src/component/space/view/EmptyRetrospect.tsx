import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

export function EmptyRetrospect() {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5rem;
      `}
    >
      <Icon icon="ic_clock" size={7.2} />
      <div
        css={css`
          width: 100%;
          text-align: center;
          margin-top: 0.8rem;
        `}
      >
        <Typography color="darkGray">
          진행중인 회고가 비어있어요 <br />
          회고를 작성해 보세요!
        </Typography>
      </div>
    </div>
  );
}
