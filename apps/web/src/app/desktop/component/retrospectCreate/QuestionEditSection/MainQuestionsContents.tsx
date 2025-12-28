import { Icon } from "@/component/common/Icon";
import { useToast } from "@/hooks/useToast";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Questions } from "@/types/retrospectCreate";
import { css } from "@emotion/react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

type MainQuestionsContentsProps = {
  questions: Questions;
  isDeleteMode: boolean;
  handleDelete: (index: number) => void;
  handleDragEnd: (result: any) => void;
};

export default function MainQuestionsContents({ questions, isDeleteMode, handleDelete, handleDragEnd }: MainQuestionsContentsProps) {
  const { toast } = useToast();

  const originalContentRef = useRef<{ [key: number]: string }>({});
  const setRetroCreateData = useSetAtom(retrospectCreateAtom);

  /**
   * 질문 내용 변경 핸들러
   *
   * @param index - 질문 인덱스
   * @param newContent - 새로운 질문 내용
   */
  const handleContentChange = (index: number, newContent: string) => {
    const updatedQuestions = questions.map((item, i) => (i === index ? { ...item, questionContent: newContent } : item));
    setRetroCreateData((prev) => ({ ...prev, questions: updatedQuestions, isNewForm: true, formName: `커스텀 템플릿` }));
  };

  /**
   * 입력 필드 포커스 시 원본 내용 저장
   *
   * @param index - 질문 인덱스
   */
  const handleContentFocus = (index: number) => {
    originalContentRef.current[index] = questions[index]?.questionContent || "";
  };

  /**
   * 입력 필드 blur 시 변경 확인 및 토스트 표시
   *
   * * 내용이 실제로 변경되고, 빈 문자열이 아닌 경우에만 토스트 표시
   * * 현재 내용을 새로운 원본으로 업데이트
   *
   * @param index - 질문 인덱스
   */
  const handleContentBlur = (index: number) => {
    const currentContent = questions[index]?.questionContent || "";
    const originalContent = originalContentRef.current[index] || "";

    if (originalContent !== currentContent && currentContent.trim() !== "") {
      setRetroCreateData((prev) => ({
        ...prev,
        hasChangedOriginal: true,
      }));
      toast.success("질문이 수정되었어요!");
    }

    originalContentRef.current[index] = currentContent;
  };

  // * 컴포넌트 마운트 시 원본 내용 저장
  useEffect(() => {
    questions.forEach((question, index) => {
      originalContentRef.current[index] = question.questionContent;
    });
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppableQuestions">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            {questions.map((item, index) => (
              <Draggable key={`question-${index}`} draggableId={`question-${index}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    css={css`
                      position: relative;
                      background: ${DESIGN_TOKEN_COLOR.gray100};
                      padding: 1.5rem 1.2rem;
                      border-radius: 0.8rem;
                      display: flex;
                      align-items: center;
                      gap: 1.2rem;
                      margin-bottom: 1.2rem;
                      transition: box-shadow 0.2s ease;
                      height: 5rem;

                      ${snapshot.isDragging &&
                      `
                              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                              transform: rotate(2deg);
                            `}
                    `}
                  >
                    {/* ---------- 순서 번호 ---------- */}
                    <div
                      css={css`
                        background-color: ${DESIGN_TOKEN_COLOR.gray700};
                        color: white;
                        border-radius: 50%;
                        width: 2rem;
                        height: 2rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1rem;
                        font-weight: 600;
                        flex-shrink: 0;
                      `}
                    >
                      {index + 1}
                    </div>

                    {/* ---------- 입력 필드 ---------- */}
                    <input
                      value={item.questionContent}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      onFocus={() => handleContentFocus(index)}
                      onBlur={() => handleContentBlur(index)}
                      placeholder="질문을 입력해주세요"
                      css={css`
                        flex-grow: 1;
                        background: transparent;
                        border: none;
                        outline: none;
                        font-size: 1.4rem;
                        font-weight: 500;
                        color: ${DESIGN_TOKEN_COLOR.gray900};

                        &::placeholder {
                          color: ${DESIGN_TOKEN_COLOR.gray500};
                        }
                      `}
                    />

                    {isDeleteMode ? (
                      /* ---------- 삭제 버튼 ---------- */
                      <Icon
                        icon="ic_delete"
                        color={DESIGN_TOKEN_COLOR.red400}
                        size={1.8}
                        onClick={() => handleDelete(index)}
                        css={css`
                          cursor: pointer;
                          &:hover {
                            opacity: 0.7;
                            transition: opacity 0.2s ease-in-out;
                          }
                        `}
                      />
                    ) : (
                      /* ---------- 드래그 핸들 ---------- */
                      <div
                        {...provided.dragHandleProps}
                        css={css`
                          cursor: grab;
                          display: flex;
                          align-items: center;
                          padding: 0.4rem;

                          &:active {
                            cursor: grabbing;
                          }
                        `}
                      >
                        <Icon icon="ic_handle" color={DESIGN_TOKEN_COLOR.gray400} size="1.8rem" />
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
