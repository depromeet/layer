import { useState, useEffect, useCallback } from "react";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DropResult } from "@hello-pangea/dnd";
import { Questions } from "@/types/retrospectCreate";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { CREATE_RETROSPECT_INIT_ATOM, retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { useToast } from "@/hooks/useToast";
import { desktopBasicModalState } from "@/store/modal/desktopBasicModalAtom";
import { CREATE_SPACE_INIT_ATOM } from "@/store/space/spaceAtom";

import AdvanceQuestions from "./AdvanceQuestions";
import MainQuestionsHeader from "./MainQuestionsHeader";
import MainQuestionsContents from "./MainQuestionsContents";
import AddQuestionView from "./AddQuestionView";
import { useModal } from "@/hooks/useModal";
import { isEqual } from "lodash-es";

type QuestionEditSectionProps = {
  onClose: () => void;
};

export default function QuestionEditSection({ onClose }: QuestionEditSectionProps) {
  const { toast } = useToast();
  const { open: openExitWarningModal } = useModal();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);

  // TODO: 아톰 구조 변경 (#593)
  const [retrospectQuestions, setRetrospectQuestions] = useAtom(CREATE_RETROSPECT_INIT_ATOM.questions);
  const flow = useAtomValue(CREATE_SPACE_INIT_ATOM.flow);
  const setModalDataState = useSetAtom(desktopBasicModalState);

  // TODO: 현재는 기능 구현으로 인해 스페이스 생성을 위한 phase가 존재하면 새로운 아톰 구조를 의미하지만, 추후에는 단일 로직으로 변경해야해요. (#593)
  const isInitializedCreateSpaceFlow = flow === "INFO";
  const isInitializedProgressingCreateSpace = retrospectQuestions.length === 0;
  const isInitializedCreateSpace = isInitializedCreateSpaceFlow || isInitializedProgressingCreateSpace;
  const originalQuestions = isInitializedCreateSpace ? retroCreateData.questions : retrospectQuestions;

  // 수정 중인 질문들을 로컬 상태로 관리 (완료 버튼 클릭 시에만 atom에 반영)
  const [editingQuestions, setEditingQuestions] = useState<Questions>(() => originalQuestions);
  const [backupQuestions, setBackupQuestions] = useState<Questions>(editingQuestions);
  const questions = editingQuestions;

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
    setEditingQuestions(items);
  };

  /**
   * 질문 내용 변경 핸들러
   *
   * @param index - 질문 인덱스
   * @param newContent - 새로운 질문 내용
   */
  const handleContentChange = (index: number, newContent: string) => {
    const updatedQuestions = questions.map((item, i) => (i === index ? { ...item, questionContent: newContent } : item));
    setEditingQuestions(updatedQuestions);
  };

  /**
   * 질문 삭제 핸들러
   *
   * @param index - 삭제할 질문의 인덱스
   */
  const handleDelete = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setEditingQuestions(updatedQuestions);
    toast.success("삭제가 완료되었어요!");
  };

  /**
   * 새 질문 추가 핸들러
   */
  const handleAddQuestion = () => {
    if (questions.length >= 10) return;

    // 현재 질문들을 백업하고 질문 추가 모드로 전환
    const questionsToBackup = [...questions];
    setBackupQuestions(questionsToBackup);
    setIsAddMode(true);

    const cancelCallback = () => {
      setEditingQuestions(questionsToBackup);
      setIsAddMode(false);
      setBackupQuestions([]);
      setModalDataState((prev) => ({
        ...prev,
        title: "질문 리스트",
        options: {
          enableFooter: false,
          needsBackButton: true,
          backButtonCallback: handleCancel,
        },
      }));
    };

    setModalDataState((prev) => ({
      ...prev,
      title: "질문 추가",
      onClose: cancelCallback,
      options: {
        enableFooter: false,
        needsBackButton: true,
        disabledClose: true,
        backButtonCallback: cancelCallback,
      },
    }));
  };

  /**
   * 질문 추가 완료 핸들러
   */
  const handleAddQuestions = (contents: string[]) => {
    const newQuestionObjects = contents.map((content) => ({
      questionType: "plain_text" as const,
      questionContent: content,
    }));
    const newQuestions = [...questions, ...newQuestionObjects];
    setEditingQuestions(newQuestions);

    // 원래 모드로 돌아가고 모달 제목 복원
    setIsAddMode(false);
    setModalDataState((prev) => ({
      ...prev,
      title: "질문 리스트",
      options: {
        enableFooter: false,
        needsBackButton: true,
        backButtonCallback: handleCancel,
      },
    }));

    toast.success("질문이 추가되었어요!");
  };

  /**
   * 질문 수정 취소 핸들러 (뒤로가기 버튼)
   */
  const handleCancel = useCallback(() => {
    const hasChanged = !isEqual(originalQuestions, editingQuestions);

    if (hasChanged) {
      openExitWarningModal({
        title: "질문 수정을 취소하시겠어요?",
        contents: "수정중인 내용은 모두 사라져요",
        onConfirm: () => {
          // 원본 질문으로 복원 (atom은 변경하지 않음, 로컬 상태만 버림)
          setEditingQuestions(originalQuestions);
          onClose();
        },
        options: {
          buttonText: ["취소", "나가기"],
        },
      });
    } else {
      onClose();
    }
  }, [originalQuestions, editingQuestions, onClose, openExitWarningModal]);

  /**
   * 삭제 모드 진입 핸들러
   * * 현재 질문 리스트를 백업
   */
  const handleDeleteModeEnter = () => {
    setBackupQuestions([...questions]);
    setIsDeleteMode(true);
  };

  /**
   * 삭제 모드 취소 핸들러 (질문 복원)
   */
  const handleDeleteModeCancel = () => {
    setEditingQuestions(backupQuestions);
    setIsDeleteMode(false);
    setBackupQuestions([]);
    toast.success("삭제가 취소되었어요!");
  };

  /**
   * 삭제 모드 완료 핸들러
   */
  const handleDeleteModeComplete = () => {
    setIsDeleteMode(false);
    setBackupQuestions([]);
  };

  // 제출 완료 핸들러
  const handleComplete = () => {
    const hasChanged = !isEqual(originalQuestions, editingQuestions);

    // 수정된 질문들을 atom에 반영
    if (isInitializedCreateSpace) {
      setRetroCreateData((prev) => ({
        ...prev,
        questions: editingQuestions,
        hasChangedOriginal: hasChanged || prev.hasChangedOriginal,
        isNewForm: hasChanged || prev.isNewForm,
        formName: hasChanged ? `커스텀 템플릿` : prev.formName,
      }));
    } else {
      setRetrospectQuestions(editingQuestions);
    }

    onClose();
  };

  // 모달의 뒤로가기 버튼과 닫기 버튼 콜백을 handleCancel로 설정
  useEffect(() => {
    if (!isAddMode) {
      setModalDataState((prev) => ({
        ...prev,
        onClose: handleCancel,
        options: {
          ...prev.options,
          disabledClose: true,
          backButtonCallback: handleCancel,
        },
      }));
    }
  }, [isAddMode, handleCancel, setModalDataState]);

  return (
    <>
      {isAddMode ? (
        <AddQuestionView onAddQuestions={handleAddQuestions} maxCount={10 - questions.length} />
      ) : (
        <>
          <section
            css={css`
              min-height: 100%;
            `}
          >
            {/* ---------- 사전 질문 ---------- */}
            <AdvanceQuestions />
            <Spacing size={3} />

            {/* ---------- 메인 질문 ---------- */}
            <section>
              <MainQuestionsHeader
                isDeleteMode={isDeleteMode}
                onDeleteModeEnter={handleDeleteModeEnter}
                onDeleteModeCancel={handleDeleteModeCancel}
                onDeleteModeComplete={handleDeleteModeComplete}
              />
              <Spacing size={1.2} />

              {/* ---------- 메인 질문 리스트 ---------- */}
              <MainQuestionsContents
                questions={questions}
                isDeleteMode={isDeleteMode}
                handleDelete={handleDelete}
                handleDragEnd={handleDragEnd}
                handleContentChange={handleContentChange}
              />

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
              padding-top: 0.8rem;
            `}
          >
            <Button colorSchema={"primary"} onClick={handleComplete} isProgress={false}>
              완료
            </Button>
          </ButtonProvider>
        </>
      )}
    </>
  );
}
