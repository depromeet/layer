import { useState } from "react";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Questions } from "@/types/retrospectCreate";
import { useAtom } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";

type QuestionEditSectionProps = {
  onClose: () => void;
};

export default function QuestionEditSection({ onClose }: QuestionEditSectionProps) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);

  const questions = retroCreateData.questions;

  /**
   * 리스트의 아이템 순서 변경
   */
  const reorder = (list: Questions, startIndex: number, endIndex: number): Questions => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * 드래그 앤 드롭이 끝났을 때 호출
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
   */
  const handleDelete = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setRetroCreateData((prev) => ({ ...prev, questions: updatedQuestions }));
  };
  /**
   * 질문 내용 변경 핸들러
   */
  const handleContentChange = (index: number, newContent: string) => {
    const updatedQuestions = questions.map((item, i) => (i === index ? { ...item, questionContent: newContent } : item));
    setRetroCreateData((prev) => ({ ...prev, questions: updatedQuestions }));
  };
  /**
   * 새 질문 추가 핸들러
   */
  const handleAddQuestion = () => {
    if (questions.length >= 10) return;

    const newQuestions = [...questions, { questionType: "plain_text" as const, questionContent: "" }];
    setRetroCreateData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleComplete = () => {
    onClose();
  };

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
        <Button colorSchema={"primary"} onClick={handleComplete} isProgress={false}>
          완료
        </Button>
      </ButtonProvider>
    </>
  );
}
