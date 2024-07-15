import { css } from "@emotion/react";

import Icon from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function HomePage() {
  return (
    <DefaultLayout
      LeftComp={<Typography>홈</Typography>}
      RightComp={
        <div
          css={css`
            width: 4rem;
            height: 4rem;
            background-color: #e3ebff;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Icon icon="layer_small" />
        </div>
      }
    ></DefaultLayout>
  );
}
