import { useState } from "react";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DropResult } from "@hello-pangea/dnd";
import { Questions } from "@/types/retrospectCreate";
import { useAtom } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { useToast } from "@/hooks/useToast";
import { desktopBasicModalState } from "@/store/modal/desktopBasicModalAtom";

import AdvanceQuestions from "./AdvanceQuestions";
import MainQuestionsHeader from "./MainQuestionsHeader";
import MainQuestionsContents from "./MainQuestionsContents";

type QuestionEditSectionProps = {
  onClose: () => void;
};

export default function QuestionEditSection({ onClose }: QuestionEditSectionProps) {
  const { toast } = useToast();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  const [modalDataState, setModalDataState] = useAtom(desktopBasicModalState);

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

    const newQuestions = [...questions, { questionType: "plain_text" as const, questionContent: "" }];
    setRetroCreateData((prev) => ({ ...prev, questions: newQuestions }));
  };

  /**
   * 삭제 모드 토글 핸들러
   */
  const handleDeleteModeToggle = () => {
    setIsDeleteMode((prev) => !prev);
  };

  return (
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
  );
}
