import { Icon } from "@/component/common/Icon";

import { TemplateQuestionType } from "@/hooks/api/template/useGetTemplateInfo";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { QuestionBox } from "./QuestionBox";

interface TemplateQuestionProps {
  templateId: number;
  templateDetailQuestionList: TemplateQuestionType[];
}

export function TemplateQuestion({ templateId, templateDetailQuestionList }: TemplateQuestionProps) {
  const templateSet = [10000, 10001, 10002, 10003, 10004, 10005];
  const isProvidedTemplateSet = templateSet.includes(templateId);

  return (
    <div
      id="template_question"
      css={css`
        margin-top: 4rem;
        padding-bottom: 3.2rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon icon="ic_recommend_color" size={2.4} />
        <p
          css={css`
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 150%;
            margin-left: 0.4rem;
            color: ${DESIGN_TOKEN_COLOR.gray800};
          `}
        >
          회고 질문은 이렇게 구성되어 있어요
        </p>
      </div>

      <ol
        css={css`
          margin: 0;
          padding: 0;
          margin-top: 1.6rem;
        `}
      >
        {templateDetailQuestionList.map((item, index) => {
          return (
            <QuestionBox
              key={item.questionId}
              index={index + 1}
              title={item.question}
              contents={item.description}
              isProvidedTemplateSet={isProvidedTemplateSet}
            />
          );
        })}
      </ol>
    </div>
  );
}
