import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { TextArea } from "@/component/common/input";
import { SelectBox } from "@/component/common/SelectBox";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useCreateActionItem } from "@/hooks/api/actionItem/useCreateActionItem";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useInput } from "@/hooks/useInput";
import { useToast } from "@/hooks/useToast";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ActionItemType } from "@/types/actionItem";
import { Retrospect } from "@/types/retrospect";

type ActionItemListViewProps = {
  isPossibleMake: boolean;
  teamActionList: ActionItemType[];
  spaceId: number | undefined;
  leaderId: number | undefined;
  restrospectArr: Retrospect[] | [];
};

type ActionItemProps = {
  actionItemContent: string;
};

export function ActionItemListView({ isPossibleMake, teamActionList, spaceId, leaderId, restrospectArr = [] }: ActionItemListViewProps) {
  const retrospectInfo = restrospectArr.map((item) => ({
    retrospectId: item.retrospectId,
    retrospectTitle: item.title,
    status: item.retrospectStatus,
  }));

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const memberId = Cookies.get("memberId");
  const [retrospect, setRetrospect] = useState("");
  const [retrospectId, setRetrospectId] = useState<number | undefined>(-1);
  const isLeader = memberId === String(leaderId);

  const { value: actionItemValue, handleInputChange } = useInput();
  const { mutate } = useCreateActionItem();
  const { toast } = useToast();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const updateRetroSpectData = ({ retrospectId, retrospectTitle }: { retrospectId: number; retrospectTitle: string }) => {
    setRetrospect(retrospectTitle);
    setRetrospectId(retrospectId);
  };

  const handleOpenBottomSheet = () => {
    openBottomSheet({ id: "actionItemSheet" });
  };

  const handleMoreActionItem = () => {
    if (spaceId && leaderId) {
      navigate("/goals/more", { state: { spaceId, leaderId } });
    }
  };

  const handleAddActionItem = () => {
    if (retrospectId === undefined || retrospectId === -1 || actionItemValue.trim() === "") {
      toast.error("회고를 선택하고 실행목표를 입력해주세요.");
      return;
    }

    mutate(
      { retrospectId, content: actionItemValue },
      {
        onSuccess: async () => {
          closeBottomSheet();
          setRetrospect("");
          setRetrospectId(-1);
          toast.success("성공적으로 실행목표가 추가되었어요!");

          if (spaceId) {
            await queryClient.invalidateQueries({
              queryKey: ["getTeamActionItemList", spaceId.toString()],
            });
          }
        },
        onError: () => {
          toast.error("예기치 못한 에러가 발생했어요");
        },
      },
    );
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 16.9rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography variant="body14Medium">실행 목표</Typography>
        {/* You must have a completed retrospective to view more. */}
        {!isPossibleMake && (
          <Typography
            variant="body14Medium"
            color="gray500"
            onClick={handleMoreActionItem}
            css={css`
              cursor: pointer;
            `}
          >
            더보기
          </Typography>
        )}
      </div>

      <Spacing size={1.0} />

      {teamActionList && teamActionList.length === 0 && (
        <>
          <Icon icon="icon_file_open" size="5.2rem" />
          <Spacing size={1.6} />
          <Typography variant="body14Medium" color="gray600">
            {isPossibleMake ? "완료된 회고가 없어요" : "실행목표를 설정해보세요"}
          </Typography>
        </>
      )}

      {teamActionList && teamActionList.length !== 0 && (
        <>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
            `}
          >
            {teamActionList.slice(0, 3).map((actionItem, idx) => (
              <ActionItem key={idx} actionItemContent={actionItem.content} />
            ))}
            {isLeader &&
              Array.from({ length: 3 - teamActionList.length }).map((_, index) => (
                <div key={`plus-${index}`} onClick={handleOpenBottomSheet}>
                  <PlusActionItem />
                </div>
              ))}
          </div>
        </>
      )}

      <BottomSheet
        id={"actionItemSheet"}
        title="실행 목표 추가"
        sheetHeight={420}
        contents={
          <Fragment>
            <div
              css={css`
                padding: 2.4rem 1rem 0 1rem;
                display: flex;
                flex-direction: column;
                height: 100%;
                position: relative;
              `}
            >
              <SelectBox data={retrospectInfo} onClick={() => {}} value={retrospect} updateRetroSpectData={updateRetroSpectData} />

              <Spacing size={1.5} />
              <TextArea value={actionItemValue} onChange={handleInputChange} placeholder={"실행목표를 입력해주세요"} height="14.3rem" />
              <ButtonProvider
                onlyContainerStyle={css`
                  padding-bottom: 0;
                `}
              >
                <Button onClick={handleAddActionItem} disabled={!actionItemValue}>
                  추가하기
                </Button>
              </ButtonProvider>
            </div>
          </Fragment>
        }
        handler={false}
      />
    </div>
  );
}

function ActionItem({ actionItemContent }: ActionItemProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.8rem;
        height: 3.2rem;
      `}
    >
      <div
        css={css`
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 100%;
          margin: 0 0.4rem;
          background: ${DESIGN_TOKEN_COLOR.gray400};
        `}
      />
      <Typography variant="body14Medium" color="gray800">
        {actionItemContent}
      </Typography>
    </div>
  );
}

function PlusActionItem() {
  return (
    <>
      <div
        css={css`
          display: flex;
          width: calc(100% + 0.8rem);
          padding: 0 0.8rem;
          align-items: center;
          transform: translateX(-0.8rem);
          gap: 0.8rem;
          height: 3.2rem;
          border-radius: 0.4rem;
          transition: 0.4s all;
          cursor: pointer;
          :hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <div
          css={css`
            width: 1.4rem;
            height: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${DESIGN_TOKEN_COLOR.gray300};
            border-radius: 0.2rem;
          `}
        >
          <Icon icon="ic_plus" color={DESIGN_TOKEN_COLOR.gray500} size={0.6} />
        </div>
        <Typography variant="body14Medium" color="gray800">
          실행목표 추가하기
        </Typography>
      </div>
    </>
  );
}
