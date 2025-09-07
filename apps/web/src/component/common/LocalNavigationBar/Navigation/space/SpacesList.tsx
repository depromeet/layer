import { css } from "@emotion/react";

import SpaceAddButton from "./SpaceAddButton";
import SpaceItem from "./SpaceItem";
import { useNavigation } from "../../context/NavigationContext";

import { useApiGetSpaceList } from "@/hooks/api/space/useApiGetSpaceList";
import { PROJECT_CATEGORY_MAP } from "../../constants";
import { useEffect, useRef } from "react";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

interface SpacesListProps {
  currentTab: "전체" | "개인" | "팀";
}

export default function SpacesList({ currentTab }: SpacesListProps) {
  const { isCollapsed } = useNavigation();

  const currentCategory = PROJECT_CATEGORY_MAP[currentTab];

  const observerRef = useRef<HTMLDivElement>(null);

  const { data: spaceData, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useApiGetSpaceList(currentCategory);

  const spaces = spaceData?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const element = observerRef.current;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isFetching && !isFetchingNextPage) {
    return <LoadingSpinner />;
  }

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        align-items: ${isCollapsed ? "center" : "flex-start"};
        gap: 0.4rem;
        margin-top: 1rem;
        padding: 0;
        flex: 1;
        overflow-y: auto;
      `}
    >
      {spaces.map((space) => (
        <SpaceItem key={space.id} space={space} />
      ))}
      <SpaceAddButton />

      {hasNextPage && <div ref={observerRef} style={{ height: "1px" }} />}

      {/* TODO: 로딩 UI 디자인 확인 필요 (임시 적용)*/}
      {isFetchingNextPage && <LoadingSpinner />}
    </ul>
  );
}
