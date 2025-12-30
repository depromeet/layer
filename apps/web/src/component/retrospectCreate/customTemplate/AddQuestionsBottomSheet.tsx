import { css } from "@emotion/react";

import { QUESTION_TYPES, RECOMMENDED_QUESTIONS } from "./questions.const";

import { QuestionItemCheckbox } from ".";

import { ButtonProvider } from "@/component/common/button";
import { CheckBoxGroup } from "@/component/common/checkBox";
import { TextArea } from "@/component/common/input";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { TagButton } from "@/component/common/tabs/TagButton";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useEditQuestions } from "@/hooks/useEditQuestions";
import { useInput } from "@/hooks/useInput";
import { useTabs } from "@/hooks/useTabs";
import { useToast } from "@/hooks/useToast";

type AddQuestionsBottomSheetProps = {
  onClose: () => void;
  handleAddQuestions: ReturnType<typeof useEditQuestions>["handleAddQuestions"];
  maxCount: number;
};

export function AddQuestionsBottomSheet({ onClose, handleAddQuestions, maxCount }: AddQuestionsBottomSheetProps) {
  const { toast } = useToast();
  const { tabs, curTab, selectTab } = useTabs(["직접 작성", "추천 질문"] as const);
  const { value: customQuestion, handleInputChange: handleCustomChange, resetInput } = useInput();
  const { isChecked, toggle, selectedValues, resetChecked } = useCheckBox();
  const { tabs: categoryTabs, curTab: curCategoryTab, selectTab: selectCategoryTab } = useTabs(QUESTION_TYPES);

  const handleCustomSave = () => {
    handleAddQuestions([customQuestion]);
    resetInput();
    onClose();
  };

  const handleRecommendedSave = () => {
    if (selectedValues.length > maxCount) {
      toast.error("추가 가능한 질문 개수를 초과했어요");
      return;
    }
    handleAddQuestions(selectedValues);
    resetChecked();
    onClose();
  };

  return (
    <div
      css={css`
        height: inherit;
        display: flex;
        flex-direction: column;
      `}
    >
      <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} />

      {curTab === "직접 작성" && (
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            margin-top: 2.3rem;
          `}
        >
          <TextArea
            placeholder="질문을 작성해주세요."
            value={customQuestion}
            onChange={handleCustomChange}
            maxLength={100}
            count
            autoResize
            minHeight="5.4rem"
            maxHeight="20rem"
          />
          <ButtonProvider>
            <ButtonProvider.Primary onClick={handleCustomSave} disabled={!customQuestion}>
              추가하기
            </ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      )}

      {curTab === "추천 질문" && (
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          `}
        >
          <Tabs
            tabs={categoryTabs}
            curTab={curCategoryTab}
            selectTab={selectCategoryTab}
            TabComp={TagButton}
            containerStyles={css`
              flex-shrink: 0;
              display: flex;
              overflow-x: auto;
              gap: 0.8rem;
              margin: 2.3rem 0;
            `}
          />
          <div
            css={css`
              padding: 1.6rem 0;
              overflow: auto;
            `}
          >
            <CheckBoxGroup
              isChecked={isChecked}
              onChange={(value) => {
                if (!isChecked(value) && selectedValues.length >= maxCount) {
                  toast.error("추가 가능한 질문 개수를 초과했어요");
                  return;
                }
                toggle(value);
              }}
              gap={4}
            >
              {RECOMMENDED_QUESTIONS[curCategoryTab].map((question, index) => {
                return (
                  <QuestionItemCheckbox value={question} key={index}>
                    {question}
                  </QuestionItemCheckbox>
                );
              })}
            </CheckBoxGroup>
          </div>
          <ButtonProvider>
            <ButtonProvider.Primary
              onClick={handleRecommendedSave}
              disabled={selectedValues.length === 0}
            >{`추가하기${selectedValues.length > 0 ? " " + selectedValues.length : ""}`}</ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      )}
    </div>
  );
}
