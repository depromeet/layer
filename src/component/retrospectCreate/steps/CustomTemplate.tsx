import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { OrderLabel } from "@/component/retrospectCreate/OrderLabel";
import { PATHS } from "@/config/paths";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";

//FIXME - 질문 더미 데이터
// const REQUIRED_QUESTIONS = ["진행상황에 대해 얼마나 만족하나요?", "목표했던 부분에 얼마나 달성했나요?"];

export function CustomTemplate() {
  const retroContext = useContext(RetrospectCreateContext);
  const [questions, _] = useAtom(questionsAtom);
  const navigate = useNavigate();
  return (
    <>
      <Header title={"해당 템플릿으로\n수정 없이 회고를 진행할까요?"} contents={"질문을 추가하거나 뺄 수 있어요!"} />
      <Spacing size={4.6} />
      <Card shadow>
        {/**FIXME - 추천받은 템플릿 데이터를 받아와서 적용되어야 함. 현재는 임시! */}
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
            <QuestionListItem key={crypto.randomUUID()}>
              <OrderLabel order={index + 1} />
              {question}
            </QuestionListItem>
          ))}
        </QuestionList>
        <Spacing size={3} />
      </Card>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={() => navigate(PATHS.questionsEdit())}>질문 수정</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={retroContext.goNext}>이대로 작성</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
