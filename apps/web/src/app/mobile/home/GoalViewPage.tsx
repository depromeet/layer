import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { Fragment } from "react";

import { status } from "@/component/ActionItem/actionItem.const.ts";
import ActionItemBox from "@/component/ActionItem/ActionItemBox.tsx";
import { NotActionItemBoxData } from "@/component/ActionItem/NotActionItemBoxData.tsx";
import { UserProfileIcon } from "@/component/common/appBar";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { TabButton } from "@/component/common/tabs/TabButton.tsx";
import { Tabs } from "@/component/common/tabs/Tabs.tsx";
import { Typography } from "@/component/common/typography";
import { useGetActionItemList } from "@/hooks/api/actionItem/useGetActionItemList.ts";
import { useTabs } from "@/hooks/useTabs.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { formatOnlyDate } from "@/utils/date";
import { useGetPersonalActionItemList } from "@/hooks/api/actionItem/useGetPersonalActionItemList";

export function GoalViewPage() {
  const { tabs, curTab, selectTab } = useTabs(["팀", "개인"] as const);
  const memberId = Cookies.get(COOKIE_KEYS.memberId);

  const isTeamTab = curTab === "팀";
  const isPersonalTab = curTab === "개인";

  // 개인 목표
  const { data: personalGoal, isLoading: isLoadingPersonalGoal } = useGetPersonalActionItemList({
    options: { enabled: !!memberId && isPersonalTab, select: (data) => data.actionItems },
  });
  // 팀 목표
  const { data: teamGoal, isLoading: isLoadingTeamGoal } = useGetActionItemList({
    memberId: Number(memberId),
    options: { enabled: !!memberId && isTeamTab, select: (data) => data.actionItems },
  });

  const filteredItem = (() => {
    if (isPersonalTab) return { data: personalGoal ?? [], loading: isLoadingPersonalGoal };
    return { data: teamGoal ?? [], loading: isLoadingTeamGoal };
  })();

  const hasNonEmptyActionItems = filteredItem?.data?.length > 0;

  return (
    <Fragment>
      {filteredItem.loading && <LoadingModal />}
      <DefaultLayout
        theme="gray"
        height="6.4rem"
        LeftComp={
          <Typography as="h1" variant="heading24Bold">
            실행목표
          </Typography>
        }
        RightComp={<UserProfileIcon />}
      >
        <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            padding-top: 1.6rem;
            row-gap: 1.2rem;
            height: 100%;
            padding-bottom: calc(var(--nav-bar-height) + 2rem);
            overflow-y: auto;
          `}
        >
          {hasNonEmptyActionItems
            ? filteredItem?.data?.map((item) =>
                item.actionItemList.length ? (
                  <ActionItemBox
                    key={item.retrospectId}
                    inProgressYn={item.status === status[0]}
                    readonly={true}
                    title={item.retrospectTitle}
                    contents={item.actionItemList.slice(0, 6)}
                    description={{
                      team: item.spaceName,
                      completeDate: formatOnlyDate(item.deadline),
                    }}
                  />
                ) : null,
              )
            : !filteredItem?.loading && <NotActionItemBoxData />}
        </div>
      </DefaultLayout>
    </Fragment>
  );
}
