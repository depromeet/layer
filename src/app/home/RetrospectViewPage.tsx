import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { Typography } from "@/component/common/typography";
import { GoMakeReviewButton, SpaceOverview } from "@/component/home";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { PATHS } from "@/config/paths";
import { useApiGetSpaceList } from "@/hooks/api/space/useApiGetSpaceList";
import { useTabs } from "@/hooks/useTabs";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { authAtom } from "@/store/auth/authAtom";

export function RetrospectViewPage() {
  const navigate = useNavigate();
  const [{ imageUrl }] = useAtom(authAtom);

  const tabMappings = {
    전체: "ALL",
    개인: "INDIVIDUAL",
    팀: "TEAM",
  } as const;
  const tabNames = Object.keys(tabMappings) as Array<keyof typeof tabMappings>;
  const { tabs, curTab, selectTab } = useTabs(tabNames);
  const selectedView = tabMappings[curTab];

  const { data: spaceList, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useApiGetSpaceList(selectedView);

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

  const goToUserInfo = () => {
    navigate(PATHS.myInfo());
  };

  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="heading24Bold">
          회고
        </Typography>
      }
      RightComp={
        imageUrl ? (
          <img
            src={imageUrl}
            css={css`
              width: 3.2rem;
              height: 3.2rem;
              border-radius: 100%;
              cursor: pointer;
            `}
            onClick={goToUserInfo}
          />
        ) : (
          <Icon
            icon="basicProfile"
            size="3.2rem"
            onClick={goToUserInfo}
            css={css`
              cursor: pointer;
            `}
          />
        )
      }
    >
      <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />

      <GoMakeReviewButton onClick={goToCreateSpace} />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 1.2rem;
          margin: 1.4rem 0;
          margin-bottom: 10rem;
        `}
      >
        {spaceList?.pages
          .flatMap((page) => page.data)
          .filter((space) => (selectedView === "ALL" ? true : space.category === selectedView))
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
