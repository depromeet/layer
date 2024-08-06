import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { ViewSelectTab, GoMakeReviewButton, SpaceOverview } from "@/component/home";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { useApiGetSpaceList } from "@/hooks/api/space/useApiGetSpaceList";
import { DefaultLayout } from "@/layout/DefaultLayout";

type ViewState = {
  viewName: string;
  selected: boolean;
};

export function RetrospectViewPage() {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState[]>([
    { viewName: "ALL", selected: true },
    { viewName: "INDIVIDUAL", selected: false },
    { viewName: "TEAM", selected: false },
  ]);

  const selectedView = viewState.find((view) => view.selected)?.viewName || "ALL";

  const { data: spaceList, lastElementRef, isLoading, isFetchingNextPage } = useApiGetSpaceList(selectedView);

  const goMakeReview = () => {
    navigate("/space/create");
  };

  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="T4">
          회고
        </Typography>
      }
      RightComp={<Icon icon="basicProfile" size="3.2rem" />}
    >
      <ViewSelectTab viewState={viewState} setViewState={setViewState} />
      <Spacing size={3.6} />
      <GoMakeReviewButton onClick={goMakeReview} />

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

        {isFetchingNextPage && <LoadingSpinner />}
      </div>

      {isLoading && <LoadingSpinner />}
    </DefaultLayout>
  );
}
