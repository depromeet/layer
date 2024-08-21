import { css } from "@emotion/react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { AxiosResponse } from "axios";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ActionItemModifyBox } from "@/component/actionItem/ActionItemModifyBox.tsx";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Typography } from "@/component/common/typography";
import { AddListItemButton } from "@/component/retrospectCreate/customTemplate/EditQuestions.tsx";
import { useCreateActionItem } from "@/hooks/api/actionItem/useCreateActionItem.ts";
import { useDeleteActionItemList } from "@/hooks/api/actionItem/useDeleteActionItemList.ts";
import { usePatchActionItemList } from "@/hooks/api/actionItem/usePatchActionItemList.ts";
import { useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { DualToneLayout } from "@/layout/DualToneLayout.tsx";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

type retrospectInfoType = {
  actionItemList: {
    actionItemId: number;
    content: string;
  }[];
  retrospectId: number;
  retrospectTitle: string;
  status: "PROCEEDING" | "DONE";
};

export function ActionItemEditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: retrospectInfo } = location.state as { data: retrospectInfoType[] };
  const { mutate: deleteActionItem, isPending: deleteActionItemPending } = useDeleteActionItemList();
  const { mutate: patchActionItem, isPending: patchActionItemPending } = usePatchActionItemList();
  const { mutate: createActionItem, isPending: createActionItemPending } = useCreateActionItem();
  const { open } = useModal();
  const { toast } = useToast();
  const actionItems = retrospectInfo?.flatMap((item) =>
    item.actionItemList.map((actionItem) => ({
      id: actionItem.actionItemId,
      content: actionItem.content,
    })),
  );
  const [data, setData] = useState(actionItems);
  const isLimit = data.length >= 6;

  const handleDelete = (id: number) => {
    open({
      title: "실행 목표 삭제",
      contents: "정말 삭제하시겠어요?",
      options: {
        type: "confirm",
      },
      onConfirm: () => {
        deleteActionItem(
          { actionItemId: id },
          {
            onSuccess: () => {
              setData(data.filter((item) => item.id !== id));
              toast.success("성공적으로 삭제가 완료되었습니다.");
            },
            onError: () => toast.error("삭제 도중 에러가 발생했습니다."),
          },
        );
      },
    });
  };

  const handleChange = (id: number, value: string) => {
    setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, content: value } : item)));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(data, result.source.index, result.destination.index);
    setData([...items]);
  };

  const reorder = (list: { id: number; content: string }[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleAdd = () => {
    if (isLimit) return;
    createActionItem(
      { retrospectId: retrospectInfo[0].retrospectId, content: "" },
      {
        onSuccess: (res: AxiosResponse<{ actionItemId: number }>) => {
          try {
            setData([...data, { id: res.data.actionItemId, content: "" }]);
          } catch {
            toast.error("실행 목표 생성 과정에서 에러가 발생했어요!");
          }
        },
      },
    );
  };

  const handleComplete = () => {
    patchActionItem(
      { retrospectId: retrospectInfo[0].retrospectId, actionItems: data },
      {
        onSuccess: () => {
          toast.success("실행목표 편집이 완료되었어요!");
          navigate(-1);
        },
        onError: () => toast.error("데이터를 수정하는데 오류가 발생했습니다."),
      },
    );
  };

  return (
    <Fragment>
      {createActionItemPending && <LoadingModal purpose={"실행 목표를 만드는 중입니다.."} />}
      {deleteActionItemPending && <LoadingModal purpose={"데이터를 삭제하는 중..."} />}
      <DualToneLayout
        title={"실행목표 편집"}
        bottomTheme={"default"}
        TopComp={
          <div
            css={css`
              background: ${DESIGN_TOKEN_COLOR.gray100};
              margin: 0 -2rem;
              padding: 1.6rem 2rem;

              display: flex;
              align-items: center;
              column-gap: 0.8rem;
            `}
          >
            <Icon
              icon={"ic_info_transparent"}
              css={css`
                path {
                  fill: ${DESIGN_TOKEN_COLOR.gray600};
                }
              `}
            />
            <Typography color={"gray600"} variant={"body14Medium"}>
              실행목표는 총 6개까지 추가 가능해요
            </Typography>
          </div>
        }
      >
        <div
          css={css`
            margin-top: 3.2rem;
            margin-bottom: 1.7rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 0.8rem;
            `}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              {
                <Droppable droppableId={"fields"}>
                  {(provided) => (
                    <div id="fields" ref={provided.innerRef} {...provided.droppableProps}>
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          row-gap: 0.8rem;
                        `}
                      >
                        {data.map((item, index) => {
                          return (
                            <Fragment key={item.id}>
                              <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    css={css`
                                      position: relative;
                                    `}
                                  >
                                    <ActionItemModifyBox
                                      contents={item.content}
                                      deleteActionItems={() => handleDelete(item.id)}
                                      handleChange={(e) => handleChange(item.id, e.target.value)}
                                      key={item.id}
                                      actionItemId={item.id}
                                    />
                                    <div
                                      {...provided.dragHandleProps}
                                      css={css`
                                        position: absolute;
                                        top: 50%;
                                        right: 1.6rem;
                                        transform: translate(0%, -50%);
                                      `}
                                    >
                                      <Icon icon="ic_handle" color={DESIGN_SYSTEM_COLOR.lightGrey3} size={"1.8rem"} />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            </Fragment>
                          );
                        })}
                      </div>

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              }
            </DragDropContext>
            {!isLimit && <AddListItemButton onClick={handleAdd} />}
          </div>
        </div>
        <ButtonProvider>
          <Button isProgress={patchActionItemPending} onClick={handleComplete}>
            완료
          </Button>
        </ButtonProvider>
      </DualToneLayout>
    </Fragment>
  );
}
