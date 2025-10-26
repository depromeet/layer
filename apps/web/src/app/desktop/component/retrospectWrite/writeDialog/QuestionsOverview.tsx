import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { AdvanceQuestionsNum, PhaseContext } from "..";
import { useContext } from "react";

interface QuestionsOverviewProps {
  isAnswerFilled: boolean;
  hasChanges: () => boolean;
  onSaveTemporary: () => void;
  completedAnswerCount: number;
}

export function QuestionsOverview({ isAnswerFilled, hasChanges, onSaveTemporary, completedAnswerCount }: QuestionsOverviewProps) {
  const { data, phase, maxPhase, movePhase } = useContext(PhaseContext);

  const canTemporarySave = hasChanges();

  const handleTemporarySave = () => {
    if (hasChanges()) {
      onSaveTemporary();
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 29.4rem;
      `}
    >
      <div
        css={css`
          border: 0.1rem solid ${DESIGN_TOKEN_COLOR.opacity8};
          border-radius: 1.8rem;
        `}
      >
        {/* -------- 질믄 전체보기 상단 UI------- */}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.6rem 1.6rem 0.8rem;
          `}
        >
          <Typography variant="title16Bold" color="gray900">
            질문 전체보기
          </Typography>
          <Typography
            variant="body12SemiBold"
            css={css`
              color: #8b909c;
            `}
          >
            {`작성완료 ${completedAnswerCount}/${maxPhase + 1}`}
          </Typography>
        </div>

        {/* -------- 질문 리스트 UI------- */}
        <ul
          css={css`
            padding: 0 0.8rem 0.8rem;
          `}
        >
          {data?.questions.map((question, index) => (
            <li
              key={index}
              onClick={() => {
                movePhase(index);
              }}
              css={css`
                display: flex;
                align-items: center;
                gap: 0.4rem;
                padding: 1.6rem 1.2rem;
                border-radius: 0.8rem;
                background-color: ${phase === index ? DESIGN_TOKEN_COLOR.blue50 : "transparent"};
                color: ${DESIGN_TOKEN_COLOR.gray600};
                cursor: pointer;
              `}
            >
              <span
                css={css`
                  width: 2.2rem;
                  height: 2.1rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                {index < AdvanceQuestionsNum ? "*" : `${index - AdvanceQuestionsNum + 1}.`}
              </span>

              {question.question}
            </li>
          ))}
        </ul>
      </div>

      {/* -------- 제출버튼 UI------ */}
      <div
        css={css`
          position: sticky;
          bottom: 0;
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 1.2rem;
        `}
      >
        <button
          type="button"
          onClick={handleTemporarySave}
          css={css`
            padding: 1.3rem 2rem;
            min-width: 8.6rem;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 140%;
            color: ${canTemporarySave ? DESIGN_TOKEN_COLOR.gray900 : DESIGN_TOKEN_COLOR.gray400};
            border-radius: 0.8rem;
            transition: 0.4s all;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray200};
            }
          `}
        >
          임시저장
        </button>
        <button
          type="button"
          onClick={() => {
            if (isAnswerFilled) {
              movePhase(maxPhase + 1);
            }
          }}
          disabled={!isAnswerFilled}
          css={css`
            flex: 1;
            padding: 1.3rem 2rem;
            background-color: ${isAnswerFilled ? "#608dff" : DESIGN_TOKEN_COLOR.gray100};
            color: ${isAnswerFilled ? DESIGN_TOKEN_COLOR.gray00 : DESIGN_TOKEN_COLOR.gray400};
            cursor: ${isAnswerFilled ? "pointer" : "not-allowed"};
            border-radius: 0.8rem;
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 140%;
            transition: 0.4s all;
          `}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
