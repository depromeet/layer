import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useContext } from "react";
import { PhaseContext } from "..";

export function QuestionNaviContainer({ children }: { children: React.ReactNode }) {
  const { phase, maxPhase, incrementPhase, decrementPhase } = useContext(PhaseContext);

  const isPrevDisabled = phase === 0;
  const isNextDisabled = phase === maxPhase;

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          gap: 0.6rem;
        `}
      >
        <button
          onClick={decrementPhase}
          css={css`
            display: flex;
            align-items: center;
            padding: 0.8rem 0.8rem 0.8rem 1.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 0.8rem;
            color: ${isPrevDisabled ? DESIGN_TOKEN_COLOR.gray400 : DESIGN_TOKEN_COLOR.gray800};
            cursor: ${isPrevDisabled ? "not-allowed" : "pointer"};
          `}
          disabled={isPrevDisabled}
        >
          <Icon icon="ic_back" color="gray400" size={1.6} />
          <span
            css={css`
              font-size: 1.4rem;
              line-height: 140%;
              font-weight: 700;
              margin-left: 0.6rem;
            `}
          >
            이전
          </span>
        </button>
        <button
          onClick={incrementPhase}
          css={css`
            display: flex;
            align-items: center;
            padding: 0.8rem 0.8rem 0.8rem 1.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 0.8rem;
            color: ${isNextDisabled ? DESIGN_TOKEN_COLOR.gray400 : DESIGN_TOKEN_COLOR.gray800};
            cursor: ${isNextDisabled ? "not-allowed" : "pointer"};
          `}
          disabled={isNextDisabled}
        >
          <span
            css={css`
              font-size: 1.4rem;
              line-height: 140%;
              font-weight: 700;
              margin-right: 0.6rem;
            `}
          >
            다음
          </span>
          <Icon
            icon="ic_back"
            color="gray800"
            size={1.6}
            css={css`
              rotate: 180deg;
            `}
          />
        </button>
      </div>
    </div>
  );
}
