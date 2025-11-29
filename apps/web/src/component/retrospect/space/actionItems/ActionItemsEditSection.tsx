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
import { useModal } from "@/hooks/useModal";
import { useDeleteActionItemList } from "@/hooks/api/actionItem/useDeleteActionItemList";
import { useApiPostActionItem } from "@/hooks/api/actionItem/useApiPostActionItem";
import { useToast } from "@/hooks/useToast";

type ActionItem = {
  actionItemId: string;
  content: string;
  isNew?: boolean;
};

type ActionItemsEditSectionProps = {
  spaceId: string;
  retrospectId: number;
  todoList: ActionItem[];
  onClose: () => void;
};

const INIT_TEMP_ID = -1;

export default function ActionItemsEditSection({ spaceId, retrospectId, todoList, onClose }: ActionItemsEditSectionProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { open, close: closeModal } = useModal();

  const [actionItems, setActionItems] = useState<ActionItem[]>(todoList);
  const [nextTempId, setNextTempId] = useState(INIT_TEMP_ID);

  const { mutate: createActionItem, isPending: isPendingCreateActionItem } = useApiPostActionItem();
  const { mutate: patchActionItem, isPending: isPendingPatchActionItem } = usePatchActionItemList();
  const { mutate: deleteActionItem } = useDeleteActionItemList();

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
    open({
      title: "실행 목표 삭제",
      contents: "정말 삭제하시겠어요?",
      onClose: closeModal,
      onConfirm: () => {
        deleteActionItem(
          { actionItemId: Number(id) },
          {
            onSuccess: async () => {
              setActionItems(actionItems.filter((item) => item.actionItemId !== id));

              const previousData: { spaceId: string; spaceName: string; teamActionItemList: ExtendedActionItemType[] } | undefined =
                await queryClient.getQueryData(["getTeamActionItemList", spaceId]);

              if (previousData) {
                const updatedData = {
                  ...previousData,
                  teamActionItemList: previousData.teamActionItemList.map((retrospect) => {
                    if (retrospect.retrospectId === retrospectId) {
                      return {
                        ...retrospect,
                        actionItemList: retrospect.actionItemList.filter((item) => item.actionItemId !== Number(id)),
                      };
                    }
                    return retrospect;
                  }),
                };

                queryClient.setQueryData(["getTeamActionItemList", spaceId], updatedData);
              }

              toast.success("실행목표 삭제가 완료되었어요!");

              closeModal();
            },
            onError: (error) => {
              console.error("삭제 실패:", error);
              closeModal();
            },
          },
        );
      },
      options: {
        buttonText: ["취소", "삭제"],
      },
    });
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
    const newId = `temp_${nextTempId}`;
    setNextTempId(nextTempId + 1);
    setActionItems([...actionItems, { actionItemId: newId, content: "", isNew: true }]);
  };

  const handleComplete = async () => {
    // * 기존 아이템과 새로운 아이템 분리
    const existingItems = actionItems.filter((item) => !item.isNew);
    const newItems = actionItems.filter((item) => item.isNew && item.content.trim() !== "");

    try {
      // 1. 새로운 아이템 생성 (순차 처리) 후 생성된 아이템 정보 수집
      const createdItems: { id: number; content: string }[] = [];

      if (newItems.length > 0) {
        for (const item of newItems) {
          const createdId = await new Promise<number>((resolve, reject) => {
            createActionItem(
              {
                retrospectId,
                content: item.content,
              },
              {
                onSuccess: (data) => {
                  resolve(data.data.actionItemId);
                },
                onError: reject,
              },
            );
          });

          // 생성된 아이템을 배열에 추가
          createdItems.push({
            id: createdId,
            content: item.content,
          });
        }
      }

      // 2. 기존 아이템 + 방금 생성된 아이템 합쳐서 업데이트
      const allItemsToUpdate = [
        ...existingItems.map((item) => ({
          id: parseInt(item.actionItemId),
          content: item.content,
        })),
        ...createdItems,
      ];

      if (allItemsToUpdate.length > 0) {
        await new Promise((resolve, reject) => {
          patchActionItem(
            {
              retrospectId,
              actionItems: allItemsToUpdate,
            },
            {
              onSuccess: resolve,
              onError: reject,
            },
          );
        });
      }

      // 3. 모든 작업 완료 후 캐시 무효화 및 완료 처리
      await queryClient.invalidateQueries({ queryKey: ["getTeamActionItemList", spaceId] });
      toast.success("실행목표 편집이 완료되었어요!");
      onClose();
    } catch (error) {
      console.error("아이템 저장 실패:", error);
      toast.error("실행목표 편집에 실패했어요.");
    }
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
                          onClick={() => {
                            if (item.isNew) {
                              setActionItems(actionItems.filter((i) => i.actionItemId !== item.actionItemId));
                            } else {
                              handleDelete(item.actionItemId);
                            }
                          }}
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
        <Button colorSchema={"primary"} onClick={handleComplete} isProgress={isPendingCreateActionItem || isPendingPatchActionItem}>
          완료
        </Button>
      </ButtonProvider>
    </>
  );
}
