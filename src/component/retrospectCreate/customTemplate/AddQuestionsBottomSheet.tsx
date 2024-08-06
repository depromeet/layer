import { css } from "@emotion/react";

import { QUESTION_TYPES, RECOMMENDED_QUESTIONS } from "./questions.const";

import { QuestionItemCheckbox, AddOptionTabs } from ".";

import { ButtonProvider } from "@/component/common/button";
import { CheckBoxGroup } from "@/component/common/checkBox";
import { Input } from "@/component/common/input";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useEditQuestions } from "@/hooks/useEditQuestions";
import { useInput } from "@/hooks/useInput";
import { useTabs } from "@/hooks/useTabs";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type AddQuestionsBottomSheetProps = {
  onClose: () => void;
  handleAddQuestions: ReturnType<typeof useEditQuestions>["handleAddQuestions"];
};

export function AddQuestionsBottomSheet({ onClose, handleAddQuestions }: AddQuestionsBottomSheetProps) {
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
      <AddOptionTabs tabs={tabs} curTab={curTab} selectTab={selectTab} />

      {curTab === "직접 작성" && (
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            margin-top: 2.3rem;
          `}
        >
          <Input placeholder="질문을 작성해주세요." value={customQuestion} onChange={handleCustomChange} maxLength={10} count />
          <ButtonProvider>
            <ButtonProvider.Primary onClick={handleCustomSave}>추가하기</ButtonProvider.Primary>
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
          <div
            css={css`
              position: relative;
            `}
          >
            <div
              css={css`
                z-index: 10;
                flex-shrink: 0;
                display: flex;
                overflow-x: auto;
                gap: 0.8rem;
                margin: 2rem 0;
                position: sticky;
              `}
            >
              {categoryTabs.map((tab, index) => (
                <CategoryButton key={index} state={tab === curCategoryTab ? "selected" : "default"} onClick={() => selectCategoryTab(tab)}>
                  {tab}
                </CategoryButton>
              ))}
            </div>
            <div
              css={css`
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: -0.8rem;
                z-index: 9;
                background: linear-gradient(to bottom, #fff 95%, transparent 100%);
              `}
            />
          </div>
          <div
            css={css`
              padding: 1.6rem 0;
              overflow: auto;
            `}
          >
            <CheckBoxGroup isChecked={isChecked} onChange={toggle} gap={4}>
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
            >{`추가하기${selectedValues.length > 0 ? " " + selectedValues.length : ""}`}</ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      )}
    </div>
  );
}

type CategoryButtonProps = {
  state?: "default" | "selected";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function CategoryButton({ children, state = "default", ...props }: CategoryButtonProps) {
  return (
    <button
      css={css`
        background-color: ${state === "selected" ? DESIGN_SYSTEM_COLOR.greyOpacity800 : DESIGN_SYSTEM_COLOR.lightGrey2};
        color: ${state === "selected" ? DESIGN_SYSTEM_COLOR.white : DESIGN_SYSTEM_COLOR.darkGrayText};
        padding: 1.2rem 1.6rem;
        border-radius: 0.8rem;
        flex-shrink: 0;
      `}
      {...props}
    >
      {children}
    </button>
  );
}
