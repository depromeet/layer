import { css } from "@emotion/react";

import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Typography } from "@/component/common/typography";
import { OrderLabel } from "@/component/retrospectCreate";
import { DefaultLayout } from "@/layout/DefaultLayout";

const REQUIRED_QUESTIONS = ["진행상황에 대해 얼마나 만족하나요?", "목표했던 부분에 얼마나 달성했나요?"];

export function QuestionsEdit() {
  return (
    <DefaultLayout LeftComp={<Icon icon={"ic_quit"} />}>
      <Header title={"질문 리스트"} contents={"문항은 최대 10개까지 구성 가능해요"} />
      <div
        css={css`
          margin-top: 3.2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        <Typography variant="B2" color={"dark"}>
          필수 질문
        </Typography>
        <QuestionList>
          {REQUIRED_QUESTIONS.map((question) => (
            <QuestionListItem key={crypto.randomUUID()}>
              <OrderLabel />
              <Typography variant="B2" color={"dark"}>
                {question}
              </Typography>
            </QuestionListItem>
          ))}
        </QuestionList>
      </div>
    </DefaultLayout>
  );
}