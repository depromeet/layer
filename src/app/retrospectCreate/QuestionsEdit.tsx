import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useState } from "react";

import { BottomSheet } from "@/component/BottomSheet";
import { AppBar } from "@/component/common/appBar";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Modal } from "@/component/common/Modal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { AddListItemButton, DeleteItemButton } from "@/component/retrospectCreate";
import { AddQuestions } from "@/component/retrospectCreate/questionsEdit/AddQuestions";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

const REQUIRED_QUESTIONS = ["진행상황에 대해 얼마나 만족하나요?", "목표했던 부분에 얼마나 달성했나요?"];

function ShowDeleteButton({ showDelete, onClick }: { showDelete: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      <Typography variant="B1" color={!showDelete ? "darkGray" : "dark"}>
        {!showDelete ? "삭제" : "완료"}
      </Typography>
    </button>
  );
}

export function QuestionsEdit() {
  const { openBottomSheet } = useBottomSheet();
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [newQuestions, setNewQuestions] = useState([...questions]);
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteItem = (targetIndex: number) => {
    setNewQuestions((prev) => prev.filter((_, i) => i !== targetIndex));
  };
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setNewQuestions((prev) => {
      const updated = [...prev];
      updated[index] = e.target.value;
      return updated;
    });
  };
  const handleSaveQuestions = () => {
    setQuestions(newQuestions);
  };
  return (
    <div
      css={css`
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        padding: 0 2rem;
      `}
    >
      <AppBar
        theme="default"
        LeftComp={<Icon icon={"ic_quit"} />}
        RightComp={<ShowDeleteButton onClick={() => setShowDelete((s) => !s)} showDelete={showDelete} />}
      />
      <Header title={"질문 리스트"} contents={"문항은 최대 10개까지 구성 가능해요"} />
      <div
        css={css`
          margin-top: 3.2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        <Typography variant="B2" color={"darkGray"}>
          필수 질문
        </Typography>
        <QuestionList>
          {REQUIRED_QUESTIONS.map((question, index) => (
            <QuestionListItem key={index}>{question}</QuestionListItem>
          ))}
        </QuestionList>
      </div>
      <Spacing size={3.3} />
      <div
        css={css`
          margin-top: 3.2rem;
          margin-bottom: 1.7rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        <Typography variant="B2" color={"darkGray"}>
          추가 질문
        </Typography>
        <QuestionList>
          {newQuestions.map((question, index) => (
            <QuestionListItem
              key={index}
              order={index + 1}
              RightComp={<Control index={index} showDelete={showDelete} handleDeleteItem={handleDeleteItem} />}
            >
              <input
                value={question}
                onChange={(e) => handleChangeQuestion(e, index)}
                css={css`
                  width: 100%;
                `}
              />
            </QuestionListItem>
          ))}
        </QuestionList>
      </div>
      <AddListItemButton onClick={openBottomSheet} />

      <Modal />
      <ButtonProvider>
        <ButtonProvider.Primary onClick={handleSaveQuestions}>완료</ButtonProvider.Primary>
      </ButtonProvider>

      <BottomSheet contents={<AddQuestions />} handler={true} />
    </div>
  );
}

type ControlProps = {
  index: number;
  showDelete: boolean;
  handleDeleteItem: (index: number) => void;
  handleDragItem?: () => void;
};

function Control({ index, showDelete, handleDeleteItem, handleDragItem }: ControlProps) {
  return showDelete ? (
    <DeleteItemButton
      onClick={() => handleDeleteItem(index)}
      styles={css`
        margin-left: auto;
      `}
    />
  ) : (
    <div
      css={css`
        margin-left: auto;
      `}
      onDrag={handleDragItem} /* TODO - drag and drop으로 질문 리스트 순서 변경 */
    >
      <Icon icon="ic_handle" color={DESIGN_SYSTEM_COLOR.lightGrey3} size={"1.8rem"} />
    </div>
  );
}
