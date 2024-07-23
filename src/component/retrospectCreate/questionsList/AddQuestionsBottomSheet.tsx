import { css } from "@emotion/react";
import { useAtom } from "jotai";

import { SelectRecommended } from "./SelectRecommended";
import { Tab } from "./Tab";

import { ButtonProvider } from "@/component/common/button";
import { Input } from "@/component/common/input";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useInput } from "@/hooks/useInput";
import { useTabs } from "@/hooks/useTabs";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";

type AddQuestionsBottomSheetProps = {
  onClose: () => void;
};

export function AddQuestionsBottomSheet({ onClose }: AddQuestionsBottomSheetProps) {
  const { tabs, curTab, selectTab } = useTabs(["직접 작성", "추천 질문"] as const);
  const [_, setQuestions] = useAtom(questionsAtom);
  const { value: customQuestion, handleInputChange: handleCustomChange, resetInput } = useInput();
  const { isChecked, toggle, selectedValues } = useCheckBox();

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
    <div>
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
          <SelectRecommended checkBoxHandlers={{ isChecked, toggle }} />
          <ButtonProvider>
            <ButtonProvider.Primary onClick={handleRecommendedSave}>{`추가하기`}</ButtonProvider.Primary>
          </ButtonProvider>
        </div>
      )}
    </div>
  );
}
