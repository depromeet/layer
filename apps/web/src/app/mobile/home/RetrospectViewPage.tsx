import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useRef, useCallback } from "react";

import { UserProfileIcon } from "@/component/common/appBar";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { Typography } from "@/component/common/typography";
import { GoMakeReviewButton, SpaceOverview } from "@/component/home";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { useApiGetSpaceList } from "@/hooks/api/space/useApiGetSpaceList";
import { useTabs } from "@/hooks/useTabs";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { useTestNatigate } from "@/lib/test-natigate";
import { EmptySpaceList } from "@/component/space/view/EmptySpaceList";

const PROJECT_CATEGORY_MAP = {
  전체: "ALL",
  개인: "INDIVIDUAL",
  팀: "TEAM",
} as const;

const CATEGORY_NAMES = Object.keys(PROJECT_CATEGORY_MAP) as Array<keyof typeof PROJECT_CATEGORY_MAP>;

export function RetrospectViewPage() {
  // const navigate = useNavigate();
  const navigate = useTestNatigate(); // TODO(prgmr99): 오탈자 확인

  const { tabs, curTab, selectTab } = useTabs(CATEGORY_NAMES);
  const currentCategory = PROJECT_CATEGORY_MAP[curTab];

  const { data: spaceList, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useApiGetSpaceList(currentCategory);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          await fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  const goToCreateSpace = () => {
    navigate(PATHS.spaceCreate());
  };

  const isEmptySpaceList =
    spaceList?.pages.flatMap((page) => page.data).filter((space) => (currentCategory === "ALL" ? true : space.category === currentCategory))
      .length === 0;

  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="heading24Bold">
          회고
        </Typography>
      }
      RightComp={<UserProfileIcon />}
    >
      <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />
      <GoMakeReviewButton onClick={goToCreateSpace} isTooltipVisible={isEmptySpaceList} />
      {isEmptySpaceList && <EmptySpaceList />}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 1.2rem;
          margin: 1.4rem 0;
          padding-bottom: var(--nav-bar-height);
        `}
      >
        {spaceList?.pages
          .flatMap((page) => page.data)
          .filter((space) => (currentCategory === "ALL" ? true : space.category === currentCategory))
          .map((space, idx) => (
            <SpaceOverview
              key={space.id}
              space={space}
              ref={spaceList.pages.flatMap((page) => page.data).length === idx + 1 ? lastElementRef : null}
            />
          ))}

        {isLoading && <LoadingSpinner />}
      </div>
    </DefaultLayout>
  );
}
