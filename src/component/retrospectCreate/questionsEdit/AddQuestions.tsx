import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useState } from "react";

import { SelectRecommended } from "./SelectRecommended";
import { Tab } from "./Tab";

import { ButtonProvider } from "@/component/common/button";
import { TextArea } from "@/component/common/input";
import { useTabs } from "@/hooks/useTabs";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";

export function AddQuestions({ onClose }: { onClose: () => void }) {
  const { tabs, curTab, selectTab } = useTabs(["직접 작성", "추천 질문"] as const);
  const [_, setQuestions] = useAtom(questionsAtom);
  const [createdQuestion, setCreatedQuestion] = useState("");

  const handleCreateQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreatedQuestion(e.target.value);
  };

  const handleSave = () => {
    setQuestions((prev) => [...prev, createdQuestion]);
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
          <TextArea placeholder="질문을 작성해주세요." value={createdQuestion} onChange={handleCreateQuestion} maxLength={10} count />
        </div>
      )}
      {curTab === "추천 질문" && (
        <div>
          <SelectRecommended />
        </div>
      )}
      <ButtonProvider>
        <ButtonProvider.Primary onClick={handleSave}>추가하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
