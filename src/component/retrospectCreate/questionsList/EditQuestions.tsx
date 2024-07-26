import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { REQUIRED_QUESTIONS } from "./questions.const";

import { BottomSheet } from "@/component/BottomSheet";
import { AppBar } from "@/component/common/appBar";
import { ButtonProvider } from "@/component/common/button";
import { Drag } from "@/component/common/dragAndDrop/Drag";
import { Drop } from "@/component/common/dragAndDrop/Drop";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { AddListItemButton, DeleteItemButton } from "@/component/retrospectCreate";
import { AddQuestionsBottomSheet } from "@/component/retrospectCreate/questionsList";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { questionsAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

function ShowDeleteButton({ showDelete, onClick }: { showDelete: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      <Typography variant="B1" color={!showDelete ? "darkGray" : "dark"}>
        {!showDelete ? "삭제" : "완료"}
      </Typography>
    </button>
  );
}

type EditQuestionsProps = Pick<ReturnType<typeof useMultiStepForm>, "goNext" | "goPrev">;

export function EditQuestions({ goNext, goPrev }: EditQuestionsProps) {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [newQuestions, setNewQuestions] = useState([...questions]);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteItem = (targetIndex: number) => {
    setNewQuestions((prev) => prev.filter((_, i) => i !== targetIndex));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setNewQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[index] = e.target.value;
      return newQuestions;
    });
  };

  const handleDataSave = () => {
    setQuestions(newQuestions);
    goNext();
  };

  useEffect(() => {
    setNewQuestions([...questions]);
  }, [questions]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    setNewQuestions((prev) => {
      if (!destination) return prev;
      const sortedQuestions = [...prev];
      const draggedQuestion = prev[source.index];
      sortedQuestions.splice(source.index, 1);
      sortedQuestions.splice(destination.index, 0, draggedQuestion);
      return sortedQuestions;
    });
  };

  return (
    <div
      css={css`
        min-height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 2rem;
      `}
    >
      <AppBar
        theme="default"
        LeftComp={<Icon icon={"ic_quit"} onClick={goPrev} />}
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
            <QuestionListItem key={index} content={question} />
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Drop droppableId="droppable">
            <QuestionList>
              {newQuestions.map((question, index) => (
                <Drag key={index} index={index} draggableId={index.toString()}>
                  <QuestionListItem
                    key={index}
                    order={index + 1}
                    RightComp={<Control index={index} showDelete={showDelete} handleDeleteItem={handleDeleteItem} />}
                  >
                    <input
                      value={question}
                      onChange={(e) => handleQuestionChange(e, index)}
                      css={css`
                        flex-grow: 1;
                      `}
                    />
                  </QuestionListItem>
                </Drag>
              ))}
            </QuestionList>
          </Drop>
        </DragDropContext>
      </div>
      <AddListItemButton onClick={openBottomSheet} />

      <ButtonProvider>
        <ButtonProvider.Primary onClick={handleDataSave}>완료</ButtonProvider.Primary>
      </ButtonProvider>

      {/**FIXME - 클로즈 버튼을 위한 임시 title 없애기 */}
      <BottomSheet contents={<AddQuestionsBottomSheet onClose={closeBottomSheet} />} handler={false} title={" "} sheetHeight={590} />
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
