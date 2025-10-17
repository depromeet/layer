import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useEffect, useMemo, useState } from "react";

import { Retrospect } from "@/types/retrospect";
import RetrospectCard from "@/app/desktop/component/home/RetrospectCard";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

export default function CompletedRetrospects() {
  const { spaceId } = useParams();

  // * 스페이스 회고 목록 조회
  const { data: retrospects, isPending: isPendingRetrospects } = useQuery(useApiOptionsGetRetrospects(spaceId));

  // * 마감된 회고 필터링
  const completedRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "DONE") || [], [retrospects]);

  const [displayedRetrospects, setDisplayedRetrospects] = useState<Retrospect[]>([]);

  const handleOnDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    setDisplayedRetrospects((prev) => {
      const items = Array.from(prev);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      return items;
    });

    // TODO: 여기서 변경된 순서를 서버에 저장하는 API를 호출 필요
  };

  useEffect(() => {
    if (completedRetrospects) {
      const completed = completedRetrospects.filter((r) => r.retrospectStatus === "DONE");
      setDisplayedRetrospects(completed);
    }
  }, [completedRetrospects]);

  if (isPendingRetrospects) {
    return <LoadingSpinner />;
  }

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
      <Typography variant="title16Bold">마감된 회고 {completedRetrospects.length}</Typography>

      {completedRetrospects.length === 0 ? (
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
                  padding-top: 1.6rem;
                  flex: 1;
                  overflow-y: auto;
                  overflow-x: hidden;
                  padding-bottom: 2rem;
                `}
              >
                {displayedRetrospects.map((retrospect, index) => (
                  <Draggable key={retrospect.retrospectId.toString()} draggableId={retrospect.retrospectId.toString()} index={index}>
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
                        `}

                          /* 평상시 스타일 */
                        transition: all 0.2s ease;

                          &:hover {
                            transform: translateY(-2px);
                          }
                        `}
                      >
                        <RetrospectCard retrospect={retrospect} spaceId={spaceId} />
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
