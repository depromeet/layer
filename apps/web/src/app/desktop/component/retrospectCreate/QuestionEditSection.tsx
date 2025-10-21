import { useState, useRef, useEffect } from "react";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Questions } from "@/types/retrospectCreate";
import { useAtom, useAtomValue } from "jotai";
import { CREATE_RETROSPECT_INIT_ATOM, retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { useToast } from "@/hooks/useToast";
import { CREATE_SPACE_INIT_ATOM } from "@/store/space/spaceAtom";

type QuestionEditSectionProps = {
  onClose: () => void;
};

export default function QuestionEditSection({ onClose }: QuestionEditSectionProps) {
  const { toast } = useToast();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);
  // TODO: 아톰 구조 변경 (#593)
  const [retrospectQuestions, setRetrospectQuestions] = useAtom(CREATE_RETROSPECT_INIT_ATOM.questions);
  const flow = useAtomValue(CREATE_SPACE_INIT_ATOM.flow);

  // 각 질문의 원본 내용을 추적하기 위한 ref
  const originalContentRef = useRef<{ [key: number]: string }>({});

  // TODO: 현재는 기능 구현으로 인해 스페이스 생성을 위한 phase가 존재하면 새로운 아톰 구조를 의미하지만, 추후에는 단일 로직으로 변경해야해요. (#593)
  const isInitilizedCreateSpaceFlow = flow === "INFO";
  const isInitilizedProgressingCreateSpace = retrospectQuestions.length === 0;
  const isInitilizedCreateSpace = isInitilizedCreateSpaceFlow || isInitilizedProgressingCreateSpace;
  const questions = isInitilizedCreateSpace ? retroCreateData.questions : retrospectQuestions;

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
    if (isInitilizedCreateSpace) {
      setRetroCreateData((prev) => ({ ...prev, questions: items }));
    } else {
      setRetrospectQuestions(items);
    }
  };

  /**
   * 질문 삭제 핸들러
   *
   * @param index - 삭제할 질문의 인덱스
   */
  const handleDelete = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    if (isInitilizedCreateSpace) {
      setRetroCreateData((prev) => ({ ...prev, questions: updatedQuestions }));
    } else {
      setRetrospectQuestions(updatedQuestions);
    }
    toast.success("삭제가 완료되었어요!");
  };

  /**
   * 질문 내용 변경 핸들러
   *
   * @param index - 질문 인덱스
   * @param newContent - 새로운 질문 내용
   */
  const handleContentChange = (index: number, newContent: string) => {
    const updatedQuestions = questions.map((item, i) => (i === index ? { ...item, questionContent: newContent } : item));
    console.log;
    if (isInitilizedCreateSpace) {
      setRetroCreateData((prev) => ({ ...prev, questions: updatedQuestions }));
    } else {
      setRetrospectQuestions(updatedQuestions);
    }
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
      toast.success("질문이 수정되었어요!");
    }

    originalContentRef.current[index] = currentContent;
  };

  /**
   * 새 질문 추가 핸들러
   */
  const handleAddQuestion = () => {
    if (questions.length >= 10) return;

    const newQuestions = [...questions, { questionType: "plain_text" as const, questionContent: "" }];
    if (isInitilizedCreateSpace) {
      setRetroCreateData((prev) => ({ ...prev, questions: newQuestions }));
    } else {
      setRetrospectQuestions(newQuestions);
    }
  };

  /**
   * 삭제 모드 토글 핸들러
   */
  const handleDeleteModeToggle = () => {
    setIsDeleteMode((prev) => !prev);
  };

  // * 컴포넌트 마운트 시 원본 내용 저장
  useEffect(() => {
    questions.forEach((question, index) => {
      originalContentRef.current[index] = question.questionContent;
    });
  }, []);

  return (
    <>
      <section
        css={css`
          height: 100%;
        `}
      >
        {/* ---------- 사전 질문 ---------- */}
        <section>
          <Typography variant="title16Bold">사전 질문</Typography>
          <Spacing size={1.2} />
          <section
            css={css`
              display: flex;
              flex-direction: column;
              gap: 1.2rem;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 1.5rem;
                padding: 1.5rem 1.2rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
                border-radius: 0.8rem;
              `}
            >
              <Icon icon="ic_star_with_cirecle" />
              <Typography variant="body14SemiBold" color="gray700">
                진행상황에 대해 얼마나 만족하나요?
              </Typography>
            </div>
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 1.5rem;
                padding: 1.5rem 1.2rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
                border-radius: 0.8rem;
              `}
            >
              <Icon icon="ic_star_with_cirecle" />
              <Typography variant="body14SemiBold" color="gray700">
                목표했던 부분에 얼마나 달성했나요?
              </Typography>
            </div>
          </section>
        </section>

        <Spacing size={3} />

        {/* ---------- 메인 질문 ---------- */}
        <section>
          <section>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Typography variant="title16Bold">메인 질문</Typography>
              {isDeleteMode ? (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                  `}
                >
                  <Typography
                    variant="body14SemiBold"
                    color="gray500"
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={handleDeleteModeToggle}
                  >
                    취소
                  </Typography>
                  <Typography
                    variant="body14SemiBold"
                    color="gray900"
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={handleDeleteModeToggle}
                  >
                    완료
                  </Typography>
                </div>
              ) : (
                <Typography
                  variant="body14SemiBold"
                  color="gray500"
                  css={css`
                    cursor: pointer;
                  `}
                  onClick={handleDeleteModeToggle}
                >
                  삭제
                </Typography>
              )}
            </div>
            <Spacing size={0.8} />
            <Typography variant="body14SemiBold" color="gray500">
              최대 10개까지 구성 가능해요
            </Typography>
          </section>

          <Spacing size={1.2} />

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
