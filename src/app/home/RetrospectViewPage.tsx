import { css } from "@emotion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { spaceFetch } from "@/api/Retrospect";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { ViewSelectTab, GoMakeReviewButton, SpaceOverview } from "@/component/home";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { Space } from "@/types/spaceType";

type ViewState = {
  viewName: string;
  selected: boolean;
};

export function RetrospectViewPage() {
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState<Space[]>([]);
  const [cursorId, setCursorId] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [viewState, setViewState] = useState<ViewState[]>([
    { viewName: "ALL", selected: true },
    { viewName: "INDIVIDUAL", selected: false },
    { viewName: "TEAM", selected: false },
  ]);

  const selectedView = viewState.find((view) => view.selected)?.viewName || "ALL";

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          spaceFetch(cursorId, selectedView, 0, setSpaces, setCursorId, setHasNextPage).catch((error) =>
            console.error("데이터 받아오기 실패:", error),
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasNextPage, cursorId, selectedView],
  );

  const goMakeReview = () => {
    navigate("/review");
  };

  useEffect(() => {
    setCursorId(0);
    setHasNextPage(true);
    setSpaces([]);
    spaceFetch(0, selectedView, 0, setSpaces, setCursorId, setHasNextPage).catch((error) => console.error("데이터 가져오기 실패:", error));
  }, [selectedView]);

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
        {spaces
          .filter((space) => (selectedView === "ALL" ? true : space.category === selectedView))
          .map((space, idx) => (
            <SpaceOverview key={space.id} space={space} ref={spaces.length === idx + 1 ? lastElementRef : null} />
          ))}
      </div>
    </DefaultLayout>
  );
}
