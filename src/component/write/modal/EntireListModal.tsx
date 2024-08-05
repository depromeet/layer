import { css } from "@emotion/react";
import { useContext, useRef } from "react";

import { AdvanceQuestionsNum, PhaseContext } from "@/app/write/RetrospectWritePage.tsx";
import { Icon } from "@/component/common/Icon";
import { Answer } from "@/component/write/phase/Write.tsx";
import { ANIMATION } from "@/style/common/animation.ts";

type EntireListProps = {
  onClose: () => void;
  answers: Answer[];
};

export function EntireListModal({ onClose, answers }: EntireListProps) {
  const { data, movePhase } = useContext(PhaseContext);
  const containerRef = useRef(null);

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(6, 8, 12, 0.22);
        display: flex;
        justify-content: center;
        padding: 1.1rem 2rem;
        z-index: 99999;
      `}
      ref={containerRef}
      onClick={(e) => {
        if (containerRef.current === e.target) onClose();
      }}
    >
      <div
        css={css`
          width: 100%;
          height: fit-content;
          max-width: 33.5rem;
          border-radius: 1.2rem;
          background-color: #f2f4f8;
          padding: 1.3rem 0;
          transition: 0.4s all;
          animation: ${ANIMATION.FADE_UP} 0.4s ease-in-out;
        `}
      >
        <div
          css={css`
            display: flex;
            column-gap: 1.3rem;
            margin-bottom: 1rem;
            height: 2.5rem;
            width: 100%;
            justify-content: center;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 1.6rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            `}
          >
            질문 전체보기
          </span>
          <Icon
            icon={"ic_arrow"}
            size={1.2}
            css={css`
              transform: rotate(180deg);
            `}
          />
        </div>
        <div
          css={css`
            height: 100%;
            max-height: 31.7rem;
            overflow-y: auto;
            overflow-x: hidden;
          `}
        >
          {data.questions.map((item, index) => {
            return (
              <div
                key={item.questionId}
                css={css`
                  width: 100%;
                  padding: 1.4rem 2.8rem;
                  display: flex;
                  align-items: center;
                  transition: 0.4s all;
                  cursor: pointer;

                  &:hover {
                    background-color: rgba(108, 156, 250, 0.15);
                  }
                `}
                onClick={() => {
                  movePhase(index);
                  onClose();
                }}
              >
                <span
                  css={css`
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-weight: 300;
                    font-variant-numeric: tabular-nums;
                    transition: 0.4s all;

                    span {
                      ${!answers[index].answerContent
                        ? css`
                            color: #8b909c;
                          `
                        : css`
                            font-weight: 400;
                          `}
                    }
                  `}
                >
                  {index < AdvanceQuestionsNum ? (
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        column-gap: 0.7rem;
                        color: ${!answers[index] && ""};
                      `}
                    >
                      <span
                        css={css`
                          position: relative;
                          top: 0.2rem;
                        `}
                      >
                        *
                      </span>
                      <span>{item.question}</span>
                    </div>
                  ) : (
                    <span>
                      {index - (AdvanceQuestionsNum - 1)}. {item.question}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
