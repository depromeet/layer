import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { Fragment } from "react";

import { status } from "@/component/actionItem/actionItem.const.ts";
import ActionItemBox from "@/component/actionItem/ActionItemBox.tsx";
import { NotActionItemBoxData } from "@/component/actionItem/NotActionItemBoxData.tsx";
import { UserProfileIcon } from "@/component/common/appBar";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { TabButton } from "@/component/common/tabs/TabButton.tsx";
import { Tabs } from "@/component/common/tabs/Tabs.tsx";
import { Typography } from "@/component/common/typography";
import { useGetActionItemList } from "@/hooks/api/actionItem/useGetActionItemList.ts";
import { useTabs } from "@/hooks/useTabs.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { formatOnlyDate } from "@/utils/date";

export function GoalViewPage() {
  const { tabs, curTab, selectTab } = useTabs(["실행중", "지난"] as const);
  const memberId = Cookies.get("memberId");
  const { data, isLoading } = useGetActionItemList({ memberId: memberId as string });
  const filteredItems = data?.actionItems?.filter(
    (item) => (curTab === tabs[0] && item.status === status[0]) || (curTab === tabs[1] && item.status === status[1]),
  );
  const hasNonEmptyActionItems = filteredItems?.some((item) => item.actionItemList && item.actionItemList.length > 0);

  return (
    <Fragment>
      {isLoading && <LoadingModal />}
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
            ? filteredItems?.map((item) =>
                item.actionItemList.length ? (
                  <ActionItemBox
                    key={item.retrospectId}
                    inProgressYn={item.status === status[0]}
                    readonly={true}
                    title={item.retrospectTitle}
                    contents={item.actionItemList.slice(0, 6)}
                    description={{
                      team: item.spaceName,
                      completeDate: formatOnlyDate(item.deadline), // Or dynamically use item.completeDate if available
                    }}
                  />
                ) : null,
              )
            : !isLoading && <NotActionItemBoxData />}
        </div>
      </DefaultLayout>
    </Fragment>
  );
}
