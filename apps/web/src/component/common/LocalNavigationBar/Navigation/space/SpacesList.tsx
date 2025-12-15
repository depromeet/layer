import { css } from "@emotion/react";

import SpaceAddButton from "./SpaceAddButton";
import SpaceItem from "./SpaceItem";
import { useNavigation } from "../../context/NavigationContext";

import { useApiGetSpaceList } from "@/hooks/api/space/useApiGetSpaceList";
import { PROJECT_CATEGORY_MAP } from "../../constants";
import { useEffect, useRef } from "react";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import AddSpacePage from "@/app/desktop/space/add/AddSpacePage";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useRetrospectCreateReset } from "@/hooks/store/useRetrospectCreateReset";
import { useSpaceCreateReset } from "@/hooks/store/useSpaceCreateReset";
import { ANIMATION } from "@/style/common/animation";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Portal } from "@/component/common/Portal";

interface SpacesListProps {
  currentTab: "전체" | "개인" | "팀";
}

export default function SpacesList({ currentTab }: SpacesListProps) {
  const { isCollapsed } = useNavigation();

  const currentCategory = PROJECT_CATEGORY_MAP[currentTab];

  const observerRef = useRef<HTMLDivElement>(null);

  const { data: spaceData, hasNextPage, isPending, isFetchingNextPage, fetchNextPage } = useApiGetSpaceList(currentCategory);

  const spaces = spaceData?.pages.flatMap((page) => page.data) ?? [];

  const { open: openDesktopModal } = useDesktopBasicModal();
  const { resetAll: resetRetrospectInfo } = useRetrospectCreateReset();
  const { resetAll: resetSpaceInfo } = useSpaceCreateReset();

  const handleOpenSpaceAdd = () => {
    openDesktopModal({
      title: "",
      contents: <AddSpacePage />,
      options: {
        enableFooter: false,
      },
      onClose: () => {
        resetRetrospectInfo();
        resetSpaceInfo();
      },
    });
  };

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

  if (isPending && !isFetchingNextPage) {
    return <LoadingSpinner />;
  }

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        align-items: ${isCollapsed ? "center" : "flex-start"};
        gap: 0.4rem;
        margin-top: 1.2rem;
        padding: 0;
        flex: 1;
        overflow-y: auto;
      `}
    >
      {spaces.map((space) => (
        <SpaceItem key={space.id} space={space} />
      ))}

      <section
        css={css`
          position: relative;
          width: 100%;
        `}
      >
        <SpaceAddButton onClick={handleOpenSpaceAdd} />

        {spaces.length === 0 && (
          <Portal id="tooltip-root">
            <div
              css={css`
                position: fixed;
                top: 31rem;
                left: 2rem;
                transform: ${isCollapsed ? "translateX(-50%)" : "none"};
                background-color: ${DESIGN_TOKEN_COLOR.gray900};
                padding: 1rem 1.4rem;
                border-radius: 0.8rem;
                animation: ${ANIMATION.BOUNCE} 2s ease-in-out infinite;
                white-space: nowrap;
                z-index: 1000;
              `}
            >
              <Typography variant="body12Medium" color="gray00">
                스페이스를 생성해야 회고를 진행할 수 있어요!
              </Typography>
              <div
                css={css`
                  ::before {
                    position: absolute;
                    top: -0.4rem;
                    left: 2rem;
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 0.2rem;
                    background: ${DESIGN_TOKEN_COLOR.gray900};
                    visibility: visible;
                    content: "";
                    transform: rotate(45deg);
                    transition:
                      opacity 0.2s ease,
                      visibility 0.2s ease;
                  }
                `}
              />
            </div>
          </Portal>
        )}
      </section>

      {hasNextPage && <div ref={observerRef} style={{ height: "1px" }} />}

      {isFetchingNextPage && <LoadingSpinner />}
    </ul>
  );
}
