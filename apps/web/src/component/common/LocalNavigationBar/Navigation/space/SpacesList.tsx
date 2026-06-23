import { css } from "@emotion/react";

import SpaceAddButton from "./SpaceAddButton";
import SpaceItem from "./SpaceItem";
import { useNavigation } from "../../context/NavigationContext";

import { useApiGetSpaceList } from "@/hooks/api/space/useApiGetSpaceList";
import { PROJECT_CATEGORY_MAP } from "../../constants";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import AddSpacePage from "@/app/desktop/space/add/AddSpacePage";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useRetrospectCreateReset } from "@/hooks/store/useRetrospectCreateReset";
import { useSpaceCreateReset } from "@/hooks/store/useSpaceCreateReset";
import { ANIMATION } from "@/style/common/animation";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Portal } from "@/component/common/Portal";
import { useApiPostSpacesImpression } from "@/hooks/api/backoffice/useApiPostSpacesImpression";
import { trackEvent } from "@/lib/google-analytics";
import { GA_EVENTS } from "@/lib/google-analytics/events";

interface SpacesListProps {
  currentTab: "전체" | "개인" | "팀";
}

export default function SpacesList({ currentTab }: SpacesListProps) {
  const { isCollapsed } = useNavigation();

  const currentCategory = PROJECT_CATEGORY_MAP[currentTab];

  const observerRef = useRef<HTMLDivElement>(null);
  const addButtonSectionRef = useRef<HTMLElement>(null);
  const [tooltipTop, setTooltipTop] = useState<number | null>(null);

  const { data: spaceData, hasNextPage, isPending, isFetchingNextPage, fetchNextPage } = useApiGetSpaceList(currentCategory);

  const spaces = spaceData?.pages.flatMap((page) => page.data) ?? [];

  const showTooltip = spaces.length === 0;

  const { open: openDesktopModal } = useDesktopBasicModal();
  const { resetAll: resetRetrospectInfo } = useRetrospectCreateReset();
  const { resetAll: resetSpaceInfo } = useSpaceCreateReset();
  const { mutate: postSpacesImpression } = useApiPostSpacesImpression();

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

    trackEvent(GA_EVENTS.SPACE.ADD_BUTTON);
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

  useEffect(() => {
    postSpacesImpression();
  }, []);

  // 온보딩 툴팁을 "스페이스 추가" 버튼 바로 아래에 위치시킨다.
  // 버튼은 Portal 밖에 있어 overflow에 가려지므로, 버튼 위치를 측정해 fixed 좌표로 전달한다.
  useEffect(() => {
    if (!showTooltip) return;

    const section = addButtonSectionRef.current;
    if (!section) return;

    // 접힌 상태에서는 갭을 좁히고, 펼친 상태에서는 넓힌다.
    const TOOLTIP_GAP = isCollapsed ? 4 : 14;
    const updatePosition = () => {
      const rect = section.getBoundingClientRect();
      setTooltipTop(rect.bottom + TOOLTIP_GAP);
    };

    updatePosition();

    // ResizeObserver로 접기/펼치기 애니메이션 중 버튼 위치 변화를 추적한다.
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(section);
    window.addEventListener("resize", updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, [showTooltip, isCollapsed, isPending]);

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
        ref={addButtonSectionRef}
        css={css`
          position: relative;
          width: 100%;
        `}
      >
        <SpaceAddButton onClick={handleOpenSpaceAdd} />

        {showTooltip && tooltipTop !== null && (
          <Portal id="tooltip-root">
            <div
              css={css`
                position: fixed;
                top: ${tooltipTop}px;
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
