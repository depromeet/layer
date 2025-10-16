// DialogContentHeader.tsx (또는 QuestionLayout.tsx로 변경 추천)
import { HeaderProvider } from "@/component/common/header";
import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import { useContext } from "react";
import { AdvanceQuestionsNum, PhaseContext } from "..";

export function QuestionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        width: fit-content;
        padding: 0.8rem 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f6f8fa;
        border-radius: 1.2rem;
        cursor: pointer;
      `}
    >
      <Typography color={"gray900"} variant={"subtitle16SemiBold"}>
        {children}
      </Typography>
    </div>
  );
}

export function CenteredAnswerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 19.2rem;
      `}
    >
      {children}
    </div>
  );
}

export function FullWidthAnswerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        margin-top: 2rem;
        flex: 1;
      `}
    >
      {children}
    </div>
  );
}

export function QuestionLayout({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const { phase } = useContext(PhaseContext);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <HeaderProvider>{header}</HeaderProvider>
      {phase < AdvanceQuestionsNum ? (
        <CenteredAnswerContainer>{children}</CenteredAnswerContainer>
      ) : (
        <FullWidthAnswerContainer>{children}</FullWidthAnswerContainer>
      )}
    </div>
  );
}
