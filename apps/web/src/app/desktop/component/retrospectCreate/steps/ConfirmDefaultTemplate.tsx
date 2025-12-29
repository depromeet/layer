import { Header } from "@/component/common/header";
import { css } from "@emotion/react";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Typography } from "@/component/common/typography";
import { Tag } from "@/component/common/tag";
import { Spacing } from "@/component/common/Spacing";
import { ButtonProvider } from "@/component/common/button";
import QuestionEditButton from "@/app/desktop/component/retrospectCreate/QuestionEditButton";
import { useContext, useEffect, useRef, useState } from "react";

import { useAtom, useAtomValue } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { useActionModal } from "@/hooks/useActionModal";
import { TemplateChoice } from "@/app/desktop/component/retrospect/choice";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { RetrospectCreateContext } from "..";
import { Tooltip } from "@/component/common/tip";
import { useToast } from "@/hooks/useToast";

export function ConfirmDefaultTemplate() {
  const { templateId, saveTemplateId } = useAtomValue(retrospectInitialState);
  const { goNext } = useContext(RetrospectCreateContext);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const { openActionModal } = useActionModal();
  const { toast } = useToast();
  const [customTemplateTitle, setCustomTemplateTitie] = useState("커스텀 템플릿");

  const titleRef = useRef<HTMLDivElement>(null);

  const {
    data: { title, tag, questions },
  } = useGetCustomTemplate(Number(templateId));

  // 질문이 수정되었는지 여부에 따라 보여줄 텍스트 결정
  const displayTitle = retroCreateData.hasChangedOriginal ? "커스텀 템플릿" : title;
  const displayTag = retroCreateData.hasChangedOriginal ? "CUSTOM" : tag;

  useEffect(() => {
    setRetroCreateData((prev) => ({
      ...prev,
      questions,
      curFormId: Number(templateId),
    }));
  }, [questions, templateId, setRetroCreateData]);

  const handleChangeTemplate = () => {
    openActionModal({
      title: "",
      contents: <TemplateChoice />,
    });
  };

  const handleDataSave = () => {
    setRetroCreateData((prev) => ({ ...prev, formName: customTemplateTitle }));
  };

  return (
    <>
      <Header
        title={`${retroCreateData.hasChangedOriginal ? "수정된" : saveTemplateId ? "해당" : "대표"} 템플릿으로 회고를 진행할까요?`}
        contents={`${retroCreateData.hasChangedOriginal ? "다음 회고에서도 해당 템플릿으로 제공해드릴게요!" : saveTemplateId ? "템플릿을 기반으로 질문을 커스텀 할 수 있어요" : "가장 최근에 선택한 회고 템플릿이에요"}`}
      />
      <Spacing size={4} />
      <div
        ref={titleRef}
        css={css`
          display: flex;
          flex-direction: column;
          border: 1px solid #dfe3ea;
          border-radius: 1.2rem;
          padding: 2rem;
          overflow-y: auto;
        `}
      >
        {/* ------- title , tag , 질문 수정 UI ------- */}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: start;
          `}
        >
          <div
            css={css`
              padding-top: 0.2rem;
            `}
          >
            {!retroCreateData.hasChangedOriginal ? (
              <Typography variant={"S1"}>{displayTitle}</Typography>
            ) : (
              <input
                type="text"
                value={customTemplateTitle}
                onChange={(e) => {
                  setCustomTemplateTitie(e.target.value);
                }}
                css={css`
                  font-size: 2rem;
                  font-weight: bold;
                  width: 100%;
                  margin-right: 1rem;
                `}
                onBlur={() => {
                  if (customTemplateTitle !== retroCreateData.formName) {
                    handleDataSave();
                    toast.success("이름 수정이 완료되었어요!");
                  }
                }}
              />
            )}

            <Tag styles="margin-top: 0.8rem">{displayTag}</Tag>
          </div>
          {retroCreateData.hasChangedOriginal ? (
            <Tooltip>
              <Tooltip.Trigger>
                <QuestionEditButton />
              </Tooltip.Trigger>
              <Tooltip.Content message="커스텀된 템플릿의 이름을 수정할 수 있어요!" placement="top-end" offsetX={-15} offsetY={10} hideOnClick />
            </Tooltip>
          ) : (
            <QuestionEditButton />
          )}
        </div>
        <Spacing size={3} />

        {/* ------- 템플릿 질문 리스트 UI ------- */}
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
      </div>

      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={handleChangeTemplate}>템플릿 변경</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={goNext}>진행하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
