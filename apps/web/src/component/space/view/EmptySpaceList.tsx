import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

export function EmptySpaceList() {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4rem 0 5rem 0;
      `}
    >
      <Icon icon="ic_clock" size={7.2} />
      <div
        css={css`
          width: 100%;
          text-align: center;
          margin-top: 1.6rem;
        `}
      >
        <Typography variant="body16Medium" color="gray600">
          스페이스가 비어있어요 <br />
          스페이스를 추가해 보세요!
        </Typography>
      </div>
    </div>
  );
}
