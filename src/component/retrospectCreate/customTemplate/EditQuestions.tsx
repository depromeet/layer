import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { REQUIRED_QUESTIONS } from "./questions.const";

import { BottomSheet } from "@/component/BottomSheet";
import { AppBar } from "@/component/common/appBar";
import { ButtonProvider } from "@/component/common/button";
import { Drag, Drop } from "@/component/common/dragAndDrop";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionList, QuestionListItem } from "@/component/common/list";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { AddQuestionsBottomSheet } from "@/component/retrospectCreate";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { isQuestionEditedAtom, retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { Questions } from "@/types/retrospectCreate";

const MAX_QUESTIONS_COUNT = 10;

type EditQuestionsProps = Pick<ReturnType<typeof useMultiStepForm>, "goNext" | "goPrev">;

export function EditQuestions({ goNext, goPrev }: EditQuestionsProps) {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const questions = retroCreateData.questions;
  const [_, setIsQuestionEdited] = useAtom(isQuestionEditedAtom);
  const [newQuestions, setNewQuestions] = useState<Questions>(questions);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteItem = (targetIndex: number) => {
    setNewQuestions((prev) => prev.filter((_, i) => i !== targetIndex));
  };

  const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setNewQuestions((prev) => {
      const newQuestions: Questions = [...prev];
      newQuestions[index] = {
        questionType: "plain_text",
        questionContent: e.target.value,
      };
      return newQuestions;
    });
  };

  const handleDataSave = () => {
    if (JSON.stringify(newQuestions) !== JSON.stringify(questions)) {
      setIsQuestionEdited(true);
      setRetroCreateData((prev) => ({ ...prev, isNewForm: true }));
    }
    setRetroCreateData((prev) => ({ ...prev, questions: newQuestions }));
    goNext();
  };

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

  useEffect(() => {
    setNewQuestions(questions);
  }, [questions]);

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
      <Header title={"질문 리스트"} contents={`문항은 최대 ${MAX_QUESTIONS_COUNT}개까지 구성 가능해요`} />
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
          {REQUIRED_QUESTIONS.map(({ questionContent }, index) => (
            <QuestionListItem key={index} content={questionContent} />
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
              {newQuestions.map(({ questionContent: question }, index) => (
                <Drag key={index} index={index} draggableId={index.toString()} isDragDisabled={showDelete}>
                  <QuestionListItem
                    key={index}
                    order={index + 1}
                    RightComp={<Control index={index} showDelete={showDelete} handleDeleteItem={handleDeleteItem} />}
                    onDrag={(e) => {
                      if (showDelete) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input
                      value={question}
                      onChange={(e) => handleQuestionInputChange(e, index)}
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
      {newQuestions.length < MAX_QUESTIONS_COUNT && <AddListItemButton onClick={openBottomSheet} />}

      <ButtonProvider>
        <ButtonProvider.Primary onClick={handleDataSave}>완료</ButtonProvider.Primary>
      </ButtonProvider>

      <BottomSheet contents={<AddQuestionsBottomSheet onClose={closeBottomSheet} />} sheetHeight={590} />
    </div>
  );
}

type ControlProps = {
  index: number;
  showDelete: boolean;
  handleDeleteItem: (index: number) => void;
};

function Control({ index, showDelete, handleDeleteItem }: ControlProps) {
  return showDelete ? (
    <button
      css={css`
        margin-left: auto;
        line-height: 0;
      `}
      onClick={() => handleDeleteItem(index)}
    >
      {/**FIXME - design token */}
      <Icon icon={"ic_delete"} color="#F85B81" />
    </button>
  ) : (
    <div
      css={css`
        margin-left: auto;
        line-height: 0;
      `}
    >
      <Icon icon="ic_handle" color={DESIGN_SYSTEM_COLOR.lightGrey3} size={"1.8rem"} />
    </div>
  );
}

function ShowDeleteButton({ showDelete, onClick }: { showDelete: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      <Typography variant="B1" color={!showDelete ? "darkGray" : "dark"}>
        {!showDelete ? "삭제" : "완료"}
      </Typography>
    </button>
  );
}

function AddListItemButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      css={css`
        // FIXME - design token
        background-color: #f1f6ff;
        border-radius: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4.8rem;
      `}
      onClick={onClick}
    >
      <Icon icon={"ic_plus_thin"} size={2.4} color={DESIGN_SYSTEM_COLOR.theme} />
    </button>
  );
}
