import { css } from "@emotion/react";
import { useAtom } from "jotai";

import { ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";

type QuestionsListProps = {
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
  goPrev: ReturnType<typeof useMultiStepForm>["goPrev"];
};

export function ConfirmEditTemplate({ goNext, goPrev }: QuestionsListProps) {
  const [questions, _] = useAtom(questionsAtom);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
      `}
    >
      <Header title={"수정된 해당 템플릿으로\n진행하시겠어요?"} contents={"다음 회고에서도 해당 템플릿으로 제공해드릴게요!"} />
      <Spacing size={5.3} />
      <Card shadow>
        {/**FIXME - 추천받은 템플릿 데이터를 받아와서 적용되어야 함. 현재는 임시! */}
        <div
          css={css`
            padding: 1rem;
            margin-bottom: 3rem;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Typography variant={"S1"}>빠르고 효율적인 회고</Typography>
          </div>
          <Spacing size={0.8} />
          <Tag>KPT회고</Tag>
        </div>
        <QuestionList>
          {questions.map((question, index) => (
            <QuestionListItem key={index} order={index + 1}>
              {question}
            </QuestionListItem>
          ))}
        </QuestionList>
        <Spacing size={3} />
      </Card>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={goPrev}>질문 수정</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={goNext}>이대로 작성</ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}
