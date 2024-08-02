import { css } from "@emotion/react";

import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";

type RestrospectBoxType = {
  retrospectId: number;
  title: string;
  introduction: string;
  isWrite: boolean;
  retrospectStatus: "PROCEEDING" | "DONE";
  writeCount: number;
  totalCount: number;
};

const statusStyles = {
  PROCEEDING: {
    backgroundColor: "#f0f4fe",
    buttonColor: "#6c9cfa",
  },
  DONE: {
    backgroundColor: "#F5F7F9",
    buttonColor: "#C1C3C6",
  },
};

export function RetrospectBox({ retrospect }: { retrospect: RestrospectBoxType }) {
  const { retrospectId, title, introduction, retrospectStatus, writeCount, totalCount } = retrospect;
  const { backgroundColor, buttonColor } = statusStyles[retrospectStatus];

  return (
    <div
      key={retrospectId}
      css={css`
        width: 100%;
        height: 13.8rem;
        background-color: ${backgroundColor};
        border-radius: 1rem;
        padding: 2rem;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography variant="B1_BOLD">{title}</Typography>
        <div>
          <Typography variant="B2_SEMIBOLD" color="blue700">
            {writeCount}
          </Typography>
          <Typography variant="B2_SEMIBOLD" color="grey800">
            {" "}
            / {totalCount}
          </Typography>
        </div>
      </div>
      <Spacing size={0.3} />
      <Typography variant="B2_SEMIBOLD" color="darkGray">
        {introduction}
      </Typography>
      <Spacing size={1.6} />
      <button
        css={css`
          width: 100%;
          height: 4rem;
          background-color: ${buttonColor};
          border-radius: 0.8rem;
        `}
      >
        <Typography variant="B2_SEMIBOLD" color="white">
          분석 확인하기
        </Typography>
      </button>
    </div>
  );
}
