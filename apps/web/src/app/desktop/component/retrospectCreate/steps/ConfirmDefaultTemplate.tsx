import { Header } from "@/component/common/header";
import { css } from "@emotion/react";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Typography } from "@/component/common/typography";
import { Tag } from "@/component/common/tag";
import { Spacing } from "@/component/common/Spacing";
import { ButtonProvider } from "@/component/common/button";
import QuestionEditButton from "@/app/desktop/component/retrospectCreate/QuestionEditButton";
import { useContext, useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { useActionModal } from "@/hooks/useActionModal";
import { TemplateChoice } from "@/app/desktop/component/retrospect/choice";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { RetrospectCreateContext } from "..";

export function ConfirmDefaultTemplate() {
  const { templateId, saveTemplateId } = useAtomValue(retrospectInitialState);
  const { goNext } = useContext(RetrospectCreateContext);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const { openActionModal } = useActionModal();

  const {
    data: { title, tag, questions },
  } = useGetCustomTemplate(Number(templateId));

  useEffect(() => {
    if (retroCreateData.questions.length > 0) return;
    setRetroCreateData((prev) => ({ ...prev, questions }));
  }, []);

  const handleChangeTemplate = () => {
    openActionModal({
      title: "",
      contents: <TemplateChoice />,
    });
  };

  return (
    <>
      <Header
        title={`${saveTemplateId ? "해당" : "대표"} 템플릿으로 회고를 진행할까요?`}
        contents={`${saveTemplateId ? "템플릿을 기반으로 질문을 커스텀 할 수 있어요" : "가장 최근에 선택한 회고 템플릿이에요"}`}
      />
      <Spacing size={4} />
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
            {retroCreateData.questions.map(({ questionContent }, index) => (
              <QuestionListItem key={index} order={index + 1} content={questionContent} />
            ))}
          </QuestionList>
        </div>
        <QuestionEditButton />
      </div>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={handleChangeTemplate}>템플릿 변경</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={goNext}>진행하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
