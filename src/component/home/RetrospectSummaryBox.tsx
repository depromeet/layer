import { css } from "@emotion/react";

import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

// FIXME: 타입과 Props 넘겨주기
export function RetrospectSummaryBox() {
  return (
    <div
      css={css`
        width: 100%;
        box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        padding: 2.2rem 2rem;
      `}
    >
      <Typography variant="title18Bold" color="gray900">
        최근 2개의 회고가 진행되었어요!
      </Typography>
      <Spacing size={2.7} />
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        `}
      >
        <SummaryBox date="06.30" retrospectName="중간발표 이후 회고" spaceName="떡잎마을 방법대" />
        <SummaryBox date="06.30" retrospectName="중간발표 이후 회고" spaceName="떡잎마을 방법대" />
      </div>
    </div>
  );
}

type SummaryBoxProps = {
  date: string;
  retrospectName: string;
  spaceName: string;
};

function SummaryBox({ date, retrospectName, spaceName }: SummaryBoxProps) {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.8rem;
      `}
    >
      <div
        css={css`
          height: 100%;
        `}
      >
        <Typography variant="body13Medium" color="gray500">
          {date}
        </Typography>
      </div>
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        `}
      >
        <Typography variant="subtitle16SemiBold" color="gray900">
          {retrospectName}
        </Typography>
        <Typography variant="body13Medium" color="gray500">
          {spaceName}
        </Typography>
      </div>
    </div>
  );
}
