import { css } from "@emotion/react";
import { useAtom } from "jotai";

import { QuestionItemCheckbox } from "./QuestionItemCheckbox";
import { QUESTION_TYPES, RECOMMENDED_QUESTIONS } from "./recommendedQuestions.const";
import { Tab } from "./Tab";

import { ButtonProvider } from "@/component/common/button";
import { CheckBoxGroup } from "@/component/common/checkBox";
import { Input } from "@/component/common/input";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useInput } from "@/hooks/useInput";
import { useTabs } from "@/hooks/useTabs";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type AddQuestionsBottomSheetProps = {
  onClose: () => void;
};

export function AddQuestionsBottomSheet({ onClose }: AddQuestionsBottomSheetProps) {
  const { tabs, curTab, selectTab } = useTabs(["직접 작성", "추천 질문"] as const);
  const [_, setQuestions] = useAtom(questionsAtom);
  const { value: customQuestion, handleInputChange: handleCustomChange, resetInput } = useInput();
  const { isChecked, toggle, selectedValues } = useCheckBox();
  const { tabs: categoryTabs, curTab: curCategoryTab, selectTab: selectCategoryTab } = useTabs(QUESTION_TYPES);

  const handleCustomSave = () => {
    setQuestions((prev) => [...prev, customQuestion]);
    resetInput();
    onClose();
  };

  const handleRecommendedSave = () => {
    setQuestions((prev) => [...prev, ...selectedValues]);
    onClose();
  };

  return (
    <>
      <Tab tabs={tabs} curTab={curTab} selectTab={selectTab} />

      {curTab === "직접 작성" && (
        <div
          css={css`
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
        <div>
          <div
            css={css`
              display: flex;
              overflow-x: auto;
              gap: 0.8rem;
              margin: 2.3rem 0;
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
              padding: 1.6rem 0;
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
            <ButtonProvider.Primary onClick={handleRecommendedSave}>{`추가하기`}</ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      )}
    </>
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
        background-color: ${state === "selected" ? DESIGN_SYSTEM_COLOR.dark : DESIGN_SYSTEM_COLOR.lightGrey2};
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
