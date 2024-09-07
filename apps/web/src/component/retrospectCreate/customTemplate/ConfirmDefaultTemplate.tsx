import { css } from "@emotion/react";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { TemplateContext } from "@/component/retrospectCreate/steps/CustomTemplate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";

type ConfirmDefaultTemplateProps = {
  goEdit: ReturnType<typeof useMultiStepForm>["goNext"];
};

export function ConfirmDefaultTemplate({ goEdit }: ConfirmDefaultTemplateProps) {
  const { goNext } = useContext(RetrospectCreateContext);
  const { title, tag, questions: originalQuestions } = useContext(TemplateContext);

  return (
    <>
      <Header title={"해당 질문들로\n회고를 진행할까요?"} contents={"템플릿을 기반으로 질문을 커스텀할 수 있어요"} />
      <Spacing size={6.5} />

      <Card
        shadow
        css={css`
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            position: relative;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 1.2rem;
              position: relative;
              background-color: transparent;
              z-index: 10;
            `}
          >
            <Typography variant={"S1"}>{title}</Typography>
            <Tag>{tag}</Tag>
          </div>
          <div
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: -1.2rem;
              z-index: 9;
              background: linear-gradient(to bottom, #fff 95%, transparent 100%);
            `}
          />
        </div>
        <div
          css={css`
            overflow-y: auto;
            margin-bottom: -2rem;
            padding: 1.2rem 0;
            padding-bottom: 2rem;
          `}
        >
          <QuestionList>
            {originalQuestions.map(({ questionContent }, index) => (
              <QuestionListItem key={index} order={index + 1} content={questionContent} />
            ))}
          </QuestionList>
        </div>
      </Card>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={goEdit}>질문 수정</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={goNext}>이대로 작성</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
