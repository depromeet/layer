import { ButtonProvider } from "@/component/common/button";
import { TextArea } from "@/component/common/input";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { css } from "@emotion/react";
import { useTabs } from "@/hooks/useTabs";
import { useInput } from "@/hooks/useInput";
import { QUESTION_TYPES, RECOMMENDED_QUESTIONS } from "@/component/retrospectCreate/customTemplate/questions.const";
import { TagButton } from "@/component/common/tabs/TagButton";
import { CheckBoxGroup } from "@/component/common/checkBox";
import { useCheckBox } from "@/hooks/useCheckBox";
import { QuestionItemCheckbox } from "@/component/retrospectCreate";
import { useToast } from "@/hooks/useToast";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useSetAtom } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";

type AddQuestionViewProps = {
  onAddQuestion: (content: string) => void;
  onAddMultipleQuestions: (contents: string[]) => void;
  maxCount: number;
};

export default function AddQuestionView({ onAddQuestion, onAddMultipleQuestions, maxCount }: AddQuestionViewProps) {
  const { toast } = useToast();
  const { tabs, curTab, selectTab } = useTabs(["직접작성", "추천질문"] as const);
  const { value: customQuestion, handleInputChange: handleCustomChange, resetInput } = useInput();
  const { tabs: categoryTabs, curTab: curCategoryTab, selectTab: selectCategoryTab } = useTabs(QUESTION_TYPES);
  const { selectedValues, isChecked, toggle } = useCheckBox();
  const setRetroCreateData = useSetAtom(retrospectCreateAtom);

  const updateRetrospectData = () => {
    setRetroCreateData((prev) => ({
      ...prev,
      isNewForm: true,
      formName: `커스텀 템플릿`,
    }));
  };

  const handleDirectAdd = () => {
    if (customQuestion.trim()) {
      onAddQuestion(customQuestion);
      resetInput();
      updateRetrospectData();
    }
  };

  const handleRecommendedAdd = () => {
    if (selectedValues.length > 0) {
      onAddMultipleQuestions(selectedValues);
      updateRetrospectData();
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      {/* 탭 영역 */}
      <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} />

      {curTab === "직접작성" && (
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            margin-top: 2.3rem;
          `}
        >
          <TextArea placeholder="질문을 작성해주세요." value={customQuestion} onChange={handleCustomChange} maxLength={20} count />
        </div>
      )}

      {curTab === "추천질문" && (
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
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
              width: 100%;
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
        </div>
      )}

      <ButtonProvider
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Primary onClick={curTab === "직접작성" ? handleDirectAdd : handleRecommendedAdd}>
          {selectedValues.length > 0 ? (
            <span>
              추가하기
              <span
                css={css`
                  margin-left: 0.4rem;
                  color: ${DESIGN_TOKEN_COLOR.blue600};
                `}
              >
                {selectedValues.length}
              </span>
            </span>
          ) : (
            "추가하기"
          )}
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}
