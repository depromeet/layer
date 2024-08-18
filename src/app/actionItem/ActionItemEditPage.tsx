import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export function ActionItemEditPage() {
  return (
    <DefaultLayout title={"실행목표 편집"}>
      <div
        css={css`
          margin-top: 3.2rem;
          margin-bottom: 1.7rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Typography variant="B2" color={"darkGray"}>
            중간발표 이후 회고
          </Typography>
        </div>
      </div>
    </DefaultLayout>
  );
}
