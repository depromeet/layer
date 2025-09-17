import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import InProgressRetrospectCard from "@/component/home/desktop/InProgressRetrospectCard";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

export default function CompletedRetrospects() {
  const [retrospects, setRetrospects] = useState([
    // { id: "1", title: "중간발표 이후 회고", description: "중간발표 과정 및 팀의 커뮤니케이션 과정", createdAt: "2024.07.30 10:00", memberCount: 4 },
    // {
    //   id: "2",
    //   title: "프로젝트 기획 회고",
    //   description: "기획 단계에서의 문제점 및 개선 방안 논의",
    //   createdAt: "2024.08.01 14:00",
    //   memberCount: 4,
    // },
    // {
    //   id: "3",
    //   title: "1차 스프린트 회고",
    //   description: "개발 과정에서의 기술적 어려움과 해결 과정",
    //   createdAt: "2024.08.05 16:00",
    //   memberCount: 4,
    // },
    // { id: "4", title: "디자인 시안 리뷰 회고", description: "디자인팀과 협업하며 발생한 이슈들", createdAt: "2024.08.10 11:00", memberCount: 4 },
    // { id: "5", title: "디자인 시안 리뷰 회고", description: "디자인팀과 협업하며 발생한 이슈들", createdAt: "2024.08.10 11:00", memberCount: 4 },
    // { id: "6", title: "디자인 시안 리뷰 회고", description: "디자인팀과 협업하며 발생한 이슈들", createdAt: "2024.08.10 11:00", memberCount: 4 },
  ]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(retrospects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRetrospects(items);
  };

  return (
    <section
      css={css`
        width: 100%;
        margin: 0 auto;
        max-width: 92.8rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: 30rem;
      `}
    >
      <Typography variant="title16Bold">마감된 회고 {retrospects.length}</Typography>

      {retrospects.length === 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            text-align: center;
            gap: 2.4rem;
            border: 1px dashed rgba(0, 0, 0, 0.12);
            border-radius: 1.2rem;
            margin-top: 1.6rem;
            flex: 1;
          `}
        >
          <Icon icon="ic_clock" size={4.8} color={DESIGN_TOKEN_COLOR.gray500} />
          <Typography variant="body16Medium" color="gray500">
            마감된 회고가 없어요 <br />
            회고 후 분석 내용을 받아보세요!
          </Typography>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="retrospects">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 1.6rem;
                  margin-top: 2.4rem;
                  flex: 1;
                  overflow-y: auto;
                  overflow-x: hidden;
                  padding-bottom: 2rem;
                `}
              >
                {retrospects.map((retrospect, index) => (
                  <Draggable key={retrospect.id} draggableId={retrospect.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        css={css`
                          /* 드래그 시에만 스타일 적용 */
                          ${snapshot.isDragging &&
                          `
                          opacity: 0.8;
                          transform: rotate(5deg);
                          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                        `}

                          /* 평상시 스타일 */
                        transition: all 0.2s ease;

                          &:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                          }
                        `}
                      >
                        <InProgressRetrospectCard
                          title={retrospect.title}
                          description={retrospect.description}
                          createdAt={retrospect.createdAt}
                          memberCount={retrospect.memberCount}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </section>
  );
}
