import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from "@/config/storage-keys";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { TextArea } from "@/component/common/input";
import { SelectBox } from "@/component/common/SelectBox";
import { SelectBoxType } from "@/component/common/SelectBox/SelectBox.tsx";
import { Spacing } from "@/component/common/Spacing";
import Tooltip from "@/component/common/Tooltip";
import { Typography } from "@/component/common/typography";
import { useCreateActionItem } from "@/hooks/api/actionItem/useCreateActionItem";
import { useApiOptionsGetRecentPersonalActionList } from "@/hooks/api/actionItem/useApiOptionsGetRecentPersonalActionList";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useInput } from "@/hooks/useInput";
import { useToast } from "@/hooks/useToast";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ActionItemType } from "@/types/actionItem";
import { Retrospect } from "@/types/retrospect";
import { PATHS } from "@layer/shared";

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

const MAX_VISIBLE_ACTION_ITEMS = 3;

export function ActionItemListView({ isPossibleMake, teamActionList, spaceId, leaderId, restrospectArr = [] }: ActionItemListViewProps) {
  const isCompleteRetrospect = restrospectArr.reduce((acc: SelectBoxType["data"], cur) => {
    if (cur.retrospectStatus === "DONE")
      acc.push({
        retrospectId: cur.retrospectId,
        retrospectTitle: cur.title,
        status: cur.retrospectStatus,
      });
    return acc;
  }, []);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const memberId = Cookies.get(COOKIE_KEYS.memberId);
  const [retrospect, setRetrospect] = useState("");
  const [retrospectId, setRetrospectId] = useState<number | undefined>(-1);
  const isLeader = Number(memberId) === leaderId;

  const [currentTab, setCurrentTab] = useState<"팀" | "개인">("팀");
  const isTeam = currentTab === "팀";

  // * 개인 실행목표(최근 회고 기준)는 개인 탭일 때만 조회한다.
  const { data: personalData, isLoading: isPersonalLoading } = useQuery({
    ...useApiOptionsGetRecentPersonalActionList(spaceId),
    enabled: !!spaceId && !isTeam,
  });
  const personalActionList = personalData?.personalActionItemList ?? [];
  const currentActionList = isTeam ? teamActionList : personalActionList;
  // * 개인 탭은 비동기 조회라 응답 전 빈 상태가 먼저 노출되는 깜빡임을 막기 위해 로딩 분기를 둔다.
  const isLoadingCurrentTab = !isTeam && isPersonalLoading;

  const { value: actionItemValue, handleInputChange } = useInput();
  const { mutate: createActionItemMutate } = useCreateActionItem();
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
      navigate(PATHS.goalsMore(), { state: { spaceId, leaderId } });
    }
  };

  const handleAddActionItem = () => {
    if (retrospectId === undefined || retrospectId === -1 || actionItemValue.trim() === "") {
      toast.error("회고를 선택하고 실행목표를 입력해주세요.");
      return;
    }

    createActionItemMutate(
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
        min-height: 16.9rem;
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
        <Typography variant="subtitle14Bold">실행 목표</Typography>
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

      {/* ---------- 팀/개인 탭 ---------- */}
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: flex-end;
          gap: 0.4rem;
        `}
      >
        {(["팀", "개인"] as const).map((tab) => {
          const isActive = tab === currentTab;
          const tabItem = (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
                gap: 0.6rem;
                width: 5rem;
                height: 4rem;
                padding: 0 0.4rem;
                background: none;
                border: none;
                cursor: pointer;
              `}
            >
              <Typography variant="subtitle14Bold" color={isActive ? "gray900" : "gray500"}>
                {tab}
              </Typography>
              <div
                css={css`
                  width: 100%;
                  height: 2px;
                  background-color: ${isActive ? DESIGN_TOKEN_COLOR.gray900 : "transparent"};
                `}
              />
            </button>
          );

          // * 개인 탭에는 NEW 안내 툴팁(파란 테마)을 기본 노출한다.
          if (tab === "개인") {
            return (
              <Tooltip key={tab} placement="bottom" align="start" theme="blue" defaultOpen storageKey={LOCAL_STORAGE_KEYS.actionItemGoalTooltipSeen}>
                <Tooltip.Trigger>{tabItem}</Tooltip.Trigger>
                <Tooltip.Content tag="NEW" arrow>
                  팀 회고 속 나의 목표를 관리해보세요.
                </Tooltip.Content>
              </Tooltip>
            );
          }

          return tabItem;
        })}
      </div>

      <Spacing size={1.0} />

      {isLoadingCurrentTab ? (
        <>
          <Icon icon="icon_file_open" size="5.2rem" />
          <Spacing size={1.6} />
          <Typography variant="body14Medium" color="gray500">
            불러오는 중...
          </Typography>
        </>
      ) : (
        currentActionList.length === 0 && (
          <>
            <Icon icon="icon_file_open" size="5.2rem" />
            <Spacing size={1.6} />
            <Typography variant="body14Medium" color="gray600">
              {isTeam ? (isPossibleMake ? "완료된 회고가 없어요" : "실행목표를 설정해보세요") : "아직 실행목표가 없어요"}
            </Typography>
          </>
        )
      )}

      {!isLoadingCurrentTab && currentActionList.length !== 0 && (
        <>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
            `}
          >
            {currentActionList.slice(0, MAX_VISIBLE_ACTION_ITEMS).map((actionItem, idx) => (
              <ActionItem key={idx} actionItemContent={actionItem.content} />
            ))}
            {isTeam &&
              isLeader &&
              Array.from({ length: MAX_VISIBLE_ACTION_ITEMS - currentActionList.length }).map((_, index) => (
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
              <SelectBox data={isCompleteRetrospect} onClick={() => {}} value={retrospect} updateRetroSpectData={updateRetroSpectData} />

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
