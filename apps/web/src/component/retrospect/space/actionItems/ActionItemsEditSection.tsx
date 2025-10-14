import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { usePatchActionItemList } from "@/hooks/api/actionItem/usePatchActionItemList";
import { Button, ButtonProvider } from "@/component/common/button";
import { useQueryClient } from "@tanstack/react-query";
import { ExtendedActionItemType } from "@/types/actionItem";

type ActionItem = {
  actionItemId: string;
  content: string;
};

type ActionItemsEditSectionProps = {
  spaceId: string;
  retrospectId: number;
  todoList: ActionItem[];
  onClose: () => void;
};

export default function ActionItemsEditSection({ spaceId, retrospectId, todoList, onClose }: ActionItemsEditSectionProps) {
  const queryClient = useQueryClient();

  const [actionItems, setActionItems] = useState<ActionItem[]>(todoList);

  const { mutate: patchActionItem, isPending } = usePatchActionItemList();

  /**
   * 리스트의 아이템 순서 변경
   *
   * @param list
   * @param startIndex
   * @param endIndex
   * @returns
   */
  const reorder = (list: ActionItem[], startIndex: number, endIndex: number): ActionItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * 드래그 앤 드롭이 끝났을 때 호출
   *
   * @param result
   * @returns
   */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(actionItems, result.source.index, result.destination.index);
    setActionItems(items);
  };

  /**
   * 아이템 삭제 핸들러
   *
   * @param id
   */
  const handleDelete = (id: string) => {
    setActionItems(actionItems.filter((item) => item.actionItemId !== id));
  };

  /**
   * 아이템 내용 변경 핸들러
   *
   * @param id
   * @param newContent
   */
  const handleContentChange = (id: string, newContent: string) => {
    setActionItems(actionItems.map((item) => (item.actionItemId === id ? { ...item, content: newContent } : item)));
  };

  /**
   * 새 아이템 추가 핸들러
   */
  const handleAddItem = () => {
    const newId = Math.max(...actionItems.map((item) => parseInt(item.actionItemId)), 0) + 1;
    setActionItems([...actionItems, { actionItemId: newId.toString(), content: "" }]);
  };

  const handleComplete = () => {
    patchActionItem(
      { retrospectId: retrospectId, actionItems: actionItems.map((item) => ({ id: parseInt(item.actionItemId), content: item.content })) },
      {
        onSuccess: async () => {
          const previousData: { spaceId: string; spaceName: string; teamActionItemList: ExtendedActionItemType[] } | undefined =
            await queryClient.getQueryData(["getTeamActionItemList", spaceId]);

          const updatedData = {
            ...previousData,
            teamActionItemList: previousData?.teamActionItemList.map((retrospect) => {
              if (retrospect.retrospectId === retrospectId) {
                return {
                  ...retrospect,
                  actionItemList: actionItems.map((item) => ({ actionItemId: parseInt(item.actionItemId), content: item.content })),
                };
              }
              return retrospect;
            }),
          };

          queryClient.setQueryData(["getTeamActionItemList", spaceId], updatedData);
          onClose();
        },
        onError: () => {},
      },
    );
  };

  return (
    <>
      <section
        css={css`
          height: 100%;
        `}
      >
        {/* ---------- 안내 메시지 ---------- */}
        <div
          css={css`
            width: calc(100% + 4.8rem);
            display: flex;
            align-items: center;
            gap: 0.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            padding: 1.6rem 2.4rem;
            margin-left: -2.4rem;
            margin-right: -2.4rem;
          `}
        >
          <Icon
            icon="ic_info_transparent"
            css={css`
              path {
                fill: ${DESIGN_TOKEN_COLOR.gray600};
                transition: 0.4s all;
              }
            `}
          />
          <Typography variant="body14Medium" color="gray600">
            실행목표는 총 6개까지 추가 가능해요
          </Typography>
        </div>

        <Spacing size={2} />

        {/* ---------- 드래그 앤 드롭 리스트 ---------- */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppableActionItems">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                {actionItems.map((item, index) => (
                  <Draggable key={item.actionItemId} draggableId={item.actionItemId} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        css={css`
                          position: relative;
                          background: ${DESIGN_TOKEN_COLOR.gray100};
                          padding: 1.5rem 1.6rem;
                          border-radius: 0.8rem;
                          display: flex;
                          align-items: center;
                          gap: 1.2rem;
                          margin-bottom: 1.2rem;
                          transition: box-shadow 0.2s ease;

                          ${snapshot.isDragging &&
                          `
                          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                          transform: rotate(2deg);
                        `}
                        `}
                      >
                        {/* ---------- 드래그 핸들 ---------- */}
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

                        {/* ---------- 입력 필드 ---------- */}
                        <input
                          value={item.content}
                          onChange={(e) => handleContentChange(item.actionItemId, e.target.value)}
                          placeholder="실행목표를 입력해주세요"
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

                        {/* ---------- 삭제 버튼 ---------- */}
                        <Icon
                          icon="ic_delete"
                          color={DESIGN_TOKEN_COLOR.gray500}
                          size={1.8}
                          onClick={() => handleDelete(item.actionItemId)}
                          css={css`
                            cursor: pointer;
                            &:hover {
                              opacity: 0.7;
                              transition: opacity 0.2s ease-in-out;
                            }
                          `}
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

        {/* ---------- 추가 버튼 ---------- */}
        <button
          onClick={handleAddItem}
          css={css`
            background-color: ${DESIGN_TOKEN_COLOR.blue100};
            border-radius: 1.2rem;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 4.8rem;
            width: 100%;
            transition: background-color 0.2s ease;
            cursor: pointer;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.blue200};
            }
          `}
        >
          <Icon icon="ic_plus_thin" size={1.8} color={DESIGN_TOKEN_COLOR.blue600} />
        </button>
      </section>
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <Button colorSchema={"primary"} onClick={handleComplete} isProgress={isPending}>
          완료
        </Button>
      </ButtonProvider>
    </>
  );
}
