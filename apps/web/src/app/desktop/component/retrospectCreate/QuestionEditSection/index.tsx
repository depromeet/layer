import { useState } from "react";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DropResult } from "@hello-pangea/dnd";
import { Questions } from "@/types/retrospectCreate";
import { useAtom, useSetAtom } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { useToast } from "@/hooks/useToast";
import { desktopBasicModalState } from "@/store/modal/desktopBasicModalAtom";

import AdvanceQuestions from "./AdvanceQuestions";
import MainQuestionsHeader from "./MainQuestionsHeader";
import MainQuestionsContents from "./MainQuestionsContents";
import AddQuestionView from "./AddQuestionView";

type QuestionEditSectionProps = {
  onClose: () => void;
};

export default function QuestionEditSection({ onClose }: QuestionEditSectionProps) {
  const { toast } = useToast();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const setModalDataState = useSetAtom(desktopBasicModalState);

  const questions = retroCreateData.questions;

  /**
   * 리스트의 아이템 순서 변경
   *
   * @param list - 질문 리스트
   * @param startIndex - 시작 인덱스
   * @param endIndex - 종료 인덱스
   * @returns 변경된 질문 리스트
   */
  const reorder = (list: Questions, startIndex: number, endIndex: number): Questions => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * 드래그 앤 드롭이 끝났을 때 호출
   *
   * @param result - 드래그 결과 객체
   */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(questions, result.source.index, result.destination.index);
    setRetroCreateData((prev) => ({ ...prev, questions: items }));
  };

  /**
   * 질문 삭제 핸들러
   *
   * @param index - 삭제할 질문의 인덱스
   */
  const handleDelete = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setRetroCreateData((prev) => ({ ...prev, questions: updatedQuestions }));
    toast.success("삭제가 완료되었어요!");
  };

  /**
   * 새 질문 추가 핸들러
   */
  const handleAddQuestion = () => {
    if (questions.length >= 10) return;

    // 질문 추가 모드로 전환하고 모달 제목 변경
    setIsAddMode(true);
    setModalDataState((prev) => ({
      ...prev,
      title: "질문 추가",
      onClose: handleAddQuestionCancel,
      options: {
        needsBackButton: true,
        disabledClose: true,
        backButtonCallback: handleAddQuestionCancel,
      },
    }));
  };

  /**
   * 질문 추가 완료 핸들러 (단일)
   */
  const handleAddQuestionComplete = (content: string) => {
    const newQuestions = [...questions, { questionType: "plain_text" as const, questionContent: content }];
    setRetroCreateData((prev) => ({ ...prev, questions: newQuestions }));

    // 원래 모드로 돌아가고 모달 제목 복원
    setIsAddMode(false);
    setModalDataState((prev) => ({
      ...prev,
      title: "질문 리스트",
      options: {
        needsBackButton: true,
        backButtonCallback: onClose,
      },
    }));

    toast.success("질문이 추가되었어요!");
  };

  /**
   * 질문 추가 완료 핸들러 (복수)
   */
  const handleAddMultipleQuestions = (contents: string[]) => {
    const newQuestionObjects = contents.map((content) => ({
      questionType: "plain_text" as const,
      questionContent: content,
    }));
    const newQuestions = [...questions, ...newQuestionObjects];
    setRetroCreateData((prev) => ({ ...prev, questions: newQuestions }));

    // 원래 모드로 돌아가고 모달 제목 복원
    setIsAddMode(false);
    setModalDataState((prev) => ({
      ...prev,
      title: "질문 리스트",
    }));

    toast.success(`${contents.length}개의 질문이 추가되었어요!`);
  };

  /**
   * 질문 추가 취소 핸들러
   */
  const handleAddQuestionCancel = () => {
    setIsAddMode(false);
    setModalDataState((prev) => ({
      ...prev,
      title: "질문 리스트",
      options: {
        needsBackButton: true,
        backButtonCallback: onClose,
      },
    }));
  };

  /**
   * 삭제 모드 토글 핸들러
   */
  const handleDeleteModeToggle = () => {
    setIsDeleteMode((prev) => !prev);
  };

  return (
    <>
      {isAddMode ? (
        <AddQuestionView
          onAddQuestion={handleAddQuestionComplete}
          onAddMultipleQuestions={handleAddMultipleQuestions}
          maxCount={10 - questions.length}
        />
      ) : (
        <>
          <section
            css={css`
              height: 100%;
            `}
          >
            {/* ---------- 사전 질문 ---------- */}
            <AdvanceQuestions />
            <Spacing size={3} />

            {/* ---------- 메인 질문 ---------- */}
            <section>
              <MainQuestionsHeader isDeleteMode={isDeleteMode} handleDeleteModeToggle={handleDeleteModeToggle} />
              <Spacing size={1.2} />

              {/* ---------- 메인 질문 리스트 ---------- */}
              <MainQuestionsContents questions={questions} isDeleteMode={isDeleteMode} handleDelete={handleDelete} handleDragEnd={handleDragEnd} />

              {/* ---------- 추가 버튼 ---------- */}
              <button
                onClick={handleAddQuestion}
                disabled={questions.length >= 10}
                css={css`
                  background-color: ${questions.length >= 10 ? DESIGN_TOKEN_COLOR.gray200 : DESIGN_TOKEN_COLOR.blue100};
                  border-radius: 1.2rem;
                  border: none;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 4.8rem;
                  width: 100%;
                  transition: background-color 0.2s ease;
                  cursor: ${questions.length >= 10 ? "not-allowed" : "pointer"};

                  &:hover {
                    background-color: ${questions.length >= 10 ? DESIGN_TOKEN_COLOR.gray200 : DESIGN_TOKEN_COLOR.blue200};
                  }
                `}
              >
                <Icon icon="ic_plus_thin" size={1.8} color={questions.length >= 10 ? DESIGN_TOKEN_COLOR.gray400 : DESIGN_TOKEN_COLOR.blue600} />
              </button>
            </section>
          </section>

          <ButtonProvider
            sort={"horizontal"}
            onlyContainerStyle={css`
              padding: 0;
            `}
          >
            <Button colorSchema={"primary"} onClick={onClose} isProgress={false}>
              완료
            </Button>
          </ButtonProvider>
        </>
      )}
    </>
  );
}
