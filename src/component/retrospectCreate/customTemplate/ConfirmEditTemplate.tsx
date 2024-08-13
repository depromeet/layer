import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useContext, useRef, useState } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Tooltip } from "@/component/common/tip";
import { TemplateContext } from "@/component/retrospectCreate/steps/CustomTemplate";
import { useInput } from "@/hooks/useInput";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useToast } from "@/hooks/useToast";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";

type QuestionsListProps = {
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
  goPrev: ReturnType<typeof useMultiStepForm>["goPrev"];
};

export function ConfirmEditTemplate({ goNext, goPrev }: QuestionsListProps) {
  const { tag } = useContext(TemplateContext);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const { value: title, handleInputChange: handleTitleChange } = useInput(retroCreateData.formName);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const { toast } = useToast();

  const handleDataSave = () => {
    setRetroCreateData((prev) => ({ ...prev, formName: title }));
  };

  const onNext = () => {
    handleDataSave();
    goNext();
  };

  return (
    <>
      <Header title={"수정된 해당 템플릿으로\n진행하시겠어요?"} contents={"다음 회고에서도 해당 템플릿으로 제공해드릴게요!"} />
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
            position: absolute;
            top: 18rem;
            right: 2rem;
          `}
        >
          {showTooltip && <Tooltip message="커스텀된 템플릿의 이름을 수정할 수 있어요!" bounce />}
        </div>
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
            <div
              css={css`
                display: flex;
              `}
            >
              <input
                ref={titleInputRef}
                value={title}
                onChange={(e) => {
                  handleTitleChange(e);
                  setShowTooltip(false);
                }}
                css={css`
                  font-size: 2rem;
                  font-weight: bold;
                  width: 100%;
                  margin-right: 1rem;
                `}
                onBlur={() => {
                  if (title !== retroCreateData.formName) {
                    handleDataSave();
                    toast.success("이름 수정이 완료되었어요!");
                  }
                }}
              />
              <Icon
                icon="ic_pencil"
                size={2.4}
                color="#d9d9d9"
                onClick={() => {
                  titleInputRef.current?.focus();
                  setShowTooltip(false);
                }}
              />
            </div>
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
            {retroCreateData.questions.map(({ questionContent }, index) => (
              <QuestionListItem key={index} order={index + 1}>
                {questionContent}
              </QuestionListItem>
            ))}
          </QuestionList>
        </div>
      </Card>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={goPrev}>템플릿 수정</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={onNext}>다음</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
