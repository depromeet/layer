import { css } from "@emotion/react";
import { Fragment } from "react";

import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { ResultControlTab } from "@/component/retrospect/analysis/ResultControlTab.tsx";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer.ts";

type ResultContainerProps = {
  data: getAnalysisResponse;
  page: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  type: "personal" | "question";
};

export function ResultContainer({ type = "question", data, page, handleDecrement, handleIncrement }: ResultContainerProps) {
  const lastPage = data ? (type === "question" ? data?.questions?.length : data?.individuals?.length) : 1;
  if (page < 0) page = 0;
  if (page > lastPage) page = lastPage;

  return (
    <div
      css={css`
        padding: 2.4rem 0;
        display: flex;
        flex-direction: column;
      `}
    >
      {
        {
          // 회고 분석 시 사용되는 질문 조회
          question: (
            <Fragment>
              <ResultControlTab curPage={page} lastPage={lastPage} handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
              <Spacing size={2.8} />
              <Typography variant={"title18Bold"} color={"gray900"}>
                {data?.questions[page]?.questionContent}
              </Typography>
              {data?.questions[page]?.answers.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {
                      {
                        number: <CSatisfactionTemplate name={item.name} index={parseInt(item.answerContent)} />,
                        range: <CAchievementTemplate name={item.name} index={parseInt(item.answerContent)} />,
                        plain_text: <CDescriptiveTemplate name={item.name} answer={item.answerContent} />,
                        combobox: null,
                        card: null,
                        markdown: null,
                      }[data?.questions[page].questionType]
                    }
                  </Fragment>
                );
              })}
            </Fragment>
          ),
          // 회고 작성 시 보여지는 개인 질문 조회
          personal: (
            <Fragment>
              <ResultControlTab
                contents={data?.individuals[page]?.name}
                curPage={page}
                lastPage={lastPage}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
              {data?.individuals[page]?.answers.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {
                      {
                        number: <CSatisfactionTemplate question={item.questionContent} index={parseInt(item.answerContent)} />,
                        range: <CAchievementTemplate question={item.questionContent} index={parseInt(item.answerContent)} />,
                        plain_text: <CDescriptiveTemplate question={item.questionContent} answer={item.answerContent} />,
                        combobox: null,
                        card: null,
                        markdown: null,
                      }[item.questionType]
                    }
                  </Fragment>
                );
              })}
            </Fragment>
          ),
        }[type]
      }
    </div>
  );
}
