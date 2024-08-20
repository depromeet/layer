import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DualToneLayout } from "@/layout/DualToneLayout.tsx";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

export function ActionItemEditPage() {
  const location = useLocation();
  const { data } = location.state as { data: string };
  console.log(data);
  return (
    <DualToneLayout
      title={"실행목표 편집"}
      bottomTheme={"default"}
      TopComp={
        <div
          css={css`
            background: ${DESIGN_TOKEN_COLOR.gray100};
            margin: 0 -2rem;
            padding: 1.6rem 2rem;

            display: flex;
            align-items: center;
            column-gap: 0.8rem;
          `}
        >
          <Icon
            icon={"ic_info_transparent"}
            css={css`
              path {
                fill: ${DESIGN_TOKEN_COLOR.gray600};
              }
            `}
          />
          <Typography color={"gray600"} variant={"body14Medium"}>
            실행목표는 총 6개까지 추가 가능해요
          </Typography>
        </div>
      }
    >
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
    </DualToneLayout>
  );
}
