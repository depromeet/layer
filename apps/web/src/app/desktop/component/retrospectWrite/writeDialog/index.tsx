import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

import { WriteDialogContent } from "./WriteDialogContent";
import { WriteDialogHeader } from "./WriteDialogHeader";
import { QuestionsOverview } from "./QuestionsOverview";

interface WriteDialogProps {
  isOverviewVisible: boolean;
  handleToggleOverview: () => void;
}

export function WriteDialog({ isOverviewVisible, handleToggleOverview }: WriteDialogProps) {
  return (
    <div
      css={css`
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100vh;
        padding: 2rem 4rem 2.4rem 2.4rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-top-left-radius: 1.2rem;
        border-bottom-left-radius: 1.2rem;
        overflow: hidden;
      `}
    >
      {/* -------- 회고 작성 헤더 UI -------- */}
      <WriteDialogHeader isOverviewVisible={isOverviewVisible} handleToggleOverview={handleToggleOverview} />

      <div
        css={css`
          display: flex;
          flex: 1;
          height: 100%;
          margin-top: 2.4rem;
          padding-left: 5.6rem;
        `}
      >
        {/* -------- 회고 작성 내용 UI -------- */}
        <WriteDialogContent />

        {/* -------- 구분선 -------- */}
        <div
          css={css`
            width: 0.1rem;
            background-color: ${DESIGN_TOKEN_COLOR.opacity8};
            margin: 0.6rem 2.8rem;
          `}
        />

        {/* -------- 회고 작성 질문 전체보기 UI -------- */}
        <QuestionsOverview />
      </div>
    </div>
  );
}
