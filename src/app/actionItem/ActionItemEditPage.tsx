import { css } from "@emotion/react";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ActionItemModifyBox } from "@/component/actionItem/ActionItemModifyBox.tsx";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Typography } from "@/component/common/typography";
import { AddListItemButton } from "@/component/retrospectCreate/customTemplate/EditQuestions.tsx";
// import { useCreateActionItem } from "@/hooks/api/actionItem/useCreateActionItem.ts";
import { useDeleteActionItemList } from "@/hooks/api/actionItem/useDeleteActionItemList.ts";
import { usePatchActionItemList } from "@/hooks/api/actionItem/usePatchActionItemList.ts";
import { useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { DualToneLayout } from "@/layout/DualToneLayout.tsx";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

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
  // const { mutate: createActionItem } = useCreateActionItem();
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
    console.log(id);
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

  const handleAdd = () => {
    if (isLimit) return;
    open({
      title: "해당 부분은 서버 연동중이에요",
      contents: "해당 부분은 21일 업데이트 예정입니다.",
      options: {
        type: "alert",
      },
    });
    // FIXME: 백엔드에서 리턴 값으로 액션 아이템 아이디를 넘겨줘야 함
    // const res = createActionItem({ retrospectId: retrospectInfo[0].retrospectId, content: "" });
    // setData([...data, { id: Date.now(), content: "test" }]);
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
            {data.map((item) => {
              return (
                <ActionItemModifyBox
                  contents={item.content}
                  deleteActionItems={() => handleDelete(item.id)}
                  handleChange={(e) => handleChange(item.id, e.target.value)} // handleChange로 상태 관리
                  key={item.id}
                  actionItemId={item.id}
                />
              );
            })}
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
