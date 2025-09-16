import { Header } from "@/component/common/header";
import { css } from "@emotion/react";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Typography } from "@/component/common/typography";
import { Tag } from "@/component/common/tag";
import { Spacing } from "@/component/common/Spacing";
import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function ConfirmDefaultTemplate() {
  // TODO 실제 템플릿id로 변경 필요
  const {
    data: { title, tag, questions },
  } = useGetCustomTemplate(10000);

  return (
    <>
      <Header title={"대표 템플릿으로 회고를 진행할까요?"} contents="가장 최근에 선택한 회고 템플릿이에요" />
      <Spacing size={4} />
      <form
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1 1 0;
          overflow-y: auto;
        `}
      >
        <div
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            border: 1px solid #dfe3ea;
            border-radius: 1.2rem;
            padding: 2rem;
            overflow-y: auto;
          `}
        >
          <Typography
            variant={"S1"}
            css={css`
              padding-right: 13rem;
            `}
          >
            {title}
          </Typography>
          <Tag styles="margin-top: 0.8rem">{tag}</Tag>
          <Spacing size={3} />
          <div
            css={css`
              overflow-y: auto;
              margin-bottom: -2rem;
              padding: 1.2rem 0;
              padding-bottom: 2rem;
            `}
          >
            <QuestionList>
              {questions.map(({ questionContent }, index) => (
                <QuestionListItem key={index} order={index + 1} content={questionContent} />
              ))}
            </QuestionList>
          </div>
          <button
            type="button"
            css={css`
              position: absolute;
              top: 2rem;
              right: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #dfe3ea;
              border-radius: 3rem;
              padding: 1.2rem 1.6rem 1.2rem 1.2rem;
              font-size: 1.4rem;
              line-height: 140%;
              color: ${DESIGN_TOKEN_COLOR.gray700};
              font-weight: 600;
            `}
          >
            <Icon
              icon="ic_write"
              size={2}
              css={css`
                margin-right: 0.8rem;
              `}
            />
            질문 수정
          </button>
        </div>
        <ButtonProvider sort={"horizontal"}>
          <ButtonProvider.Gray>템플릿 변경</ButtonProvider.Gray>
          <ButtonProvider.Primary>진행하기</ButtonProvider.Primary>
        </ButtonProvider>
      </form>
    </>
  );
}
