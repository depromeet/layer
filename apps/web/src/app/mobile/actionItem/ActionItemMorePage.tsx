import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";

import { status } from "@/component/ActionItem/actionItem.const.ts";
import ActionItemBox from "@/component/ActionItem/ActionItemBox.tsx";
import { BottomSheet } from "@/component/BottomSheet";
import { Callout } from "@/component/common/callout/Callout.tsx";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useGetSpaceActionItemList } from "@/hooks/api/actionItem/useGetSpaceActionItemList.ts";
import { useApiOptionsGetPersonalActionItemListBySpace } from "@/hooks/api/actionItem/useApiOptionsGetPersonalActionItemListBySpace.ts";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";

export function ActionItemMorePage() {
  const location = useLocation();
  const { spaceId, leaderId } = location.state as { spaceId: number; leaderId: number };
  const memberId = Cookies.get(COOKIE_KEYS.memberId);
  const { openBottomSheet } = useBottomSheet();
  const { data, isLoading, refetch } = useGetSpaceActionItemList({ spaceId: spaceId });
  const scaledData = data?.teamActionItemList.map((item) => ({
    retrospectId: item.retrospectId,
    retrospectTitle: item.retrospectTitle,
    status: item.status,
    actionItemList: item.actionItemList,
  }));
  const SHEET_ID = "info";
  const isLeader = Number(memberId) === leaderId;

  const [currentTab, setCurrentTab] = useState<"팀" | "개인">("팀");
  const isTeam = currentTab === "팀";

  // * 개인 실행목표는 개인 탭일 때만 조회한다.
  const { data: personalData, isLoading: isPersonalLoading, refetch: refetchPersonal } = useQuery({
    ...useApiOptionsGetPersonalActionItemListBySpace(spaceId),
    enabled: !!spaceId && !isTeam,
  });
  const personalScaledData = personalData?.personalActionItemList.map((item) => ({
    retrospectId: item.retrospectId,
    retrospectTitle: item.retrospectTitle,
    status: item.status,
    actionItemList: item.actionItemList,
  }));

  // * 한 탭 안에서 진행 중(PROCEEDING) → 지난(DONE) 순으로 모두 표기한다.
  const rawItems = isTeam ? data?.teamActionItemList : personalData?.personalActionItemList;
  const sortedItems = [...(rawItems ?? [])].sort((a, b) => (a.status === status[0] ? 0 : 1) - (b.status === status[0] ? 0 : 1));
  return (
    <Fragment>
      {(isTeam ? isLoading : isPersonalLoading) && <LoadingModal />}
      <BottomSheet
        id={"info"}
        title={"실행목표란?"}
        contents={
          <div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                padding-top: 3.5rem;

                span {
                  ${DESIGN_TOKEN_TEXT.body16Medium}
                  color: ${DESIGN_TOKEN_COLOR.gray600};
                }
              `}
            >
              <Typography>실행목표란 회고 완료 후 실제로 변화를 이루기 위해 필요한 구체적인 개선 작업이나 활동을 의미해요!</Typography>
            </div>
            <Spacing size={2.4} />
            <Callout
              title={"실행목표 설정은 대표자만 가능해요"}
              content={"회고 이후 팀원들과 심도있는 대화를 통해 공동의 실행 목표를 설정해보세요!"}
            />
          </div>
        }
      />
      <DefaultLayout
        theme={"gray"}
        title={"실행목표"}
        RightComp={
          <Icon
            icon={"ic_info_transparent"}
            size={2.5}
            onClick={() => {
              openBottomSheet({ id: SHEET_ID });
            }}
          />
        }
      >
        {/* ---------- 팀/개인 탭 ---------- */}
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            gap: 1.2rem;
            padding-top: 0.5rem;
          `}
        >
          {(["팀", "개인"] as const).map((tab) => {
            const isActive = tab === currentTab;
            return (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 0.6rem;
                  padding: 0 0.4rem;
                  background: none;
                  border: none;
                  cursor: pointer;
                `}
              >
                <Typography
                  variant="subtitle18SemiBold"
                  color={isActive ? "gray900" : "gray500"}
                  css={css`
                    font-weight: 600;
                  `}
                >
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
          })}
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
            padding: 1.5rem 0;
          `}
        >
          {sortedItems.map((item) => {
            return (
              <ActionItemBox
                key={item.retrospectId}
                id={item.retrospectId}
                inProgressYn={item.status === status[0]}
                title={item.retrospectTitle}
                contents={item.actionItemList}
                retrospectInfo={isTeam ? scaledData : personalScaledData}
                emitDataRefetch={isTeam ? refetch : refetchPersonal}
                readonly={isTeam ? !isLeader : false}
                isPersonal={!isTeam}
                spaceId={spaceId}
              />
            );
          })}
        </div>
      </DefaultLayout>
    </Fragment>
  );
}
