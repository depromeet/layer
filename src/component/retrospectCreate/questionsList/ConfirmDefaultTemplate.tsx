import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";

type ConfirmDefaultTemplateProps = {
  goEdit: ReturnType<typeof useMultiStepForm>["goNext"];
};

export function ConfirmDefaultTemplate({ goEdit }: ConfirmDefaultTemplateProps) {
  const retroContext = useContext(RetrospectCreateContext);
  const [questions, _] = useAtom(questionsAtom);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
      `}
    >
      <Header title={"해당 템플릿으로\n수정 없이 회고를 진행할까요?"} contents={"질문을 추가하거나 뺄 수 있어요!"} />
      <Spacing size={4.6} />
      <Card shadow>
        <div
          css={css`
            padding: 1rem;
            margin-bottom: 3rem;
          `}
        >
          <Typography variant={"S1"}>빠르고 효율적인 회고</Typography>
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
        <ButtonProvider.Gray onClick={goEdit}>질문 수정</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={retroContext.goNext}>이대로 작성</ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}
