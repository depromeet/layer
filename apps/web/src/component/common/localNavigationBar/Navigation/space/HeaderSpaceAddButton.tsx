import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

export default function HeaderSpaceAddButton() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 0.4rem 0.4rem 0.8rem;
      `}
    >
      <Typography variant="subtitle16SemiBold" color="gray900">
        내 스페이스
      </Typography>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.4rem;
          height: 2.4rem;
          padding: 0.3rem;
        `}
      >
        <Icon icon="ic_plus" size={1.6} />
      </div>
    </div>
  );
}
