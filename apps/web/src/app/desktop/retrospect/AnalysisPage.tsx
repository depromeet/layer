import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { css } from "@emotion/react";

import { currentSpaceState } from "@/store/space/spaceAtom";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";

import AnalysisDialog from "../component/analysis/AnalysisDialog";
import AnalysisOverview from "../component/analysis/AnalysisOverview";
import { useNavigation } from "@/component/common/LocalNavigationBar/context/NavigationContext";

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const [currentSpace, setCurrentSpace] = useAtom(currentSpaceState);

  const { isCollapsed, handleCollapse } = useNavigation();

  const spaceId = searchParams.get("spaceId");
  const retrospectId = searchParams.get("retrospectId");

  const { data: spaceInfo } = useQuery(useApiOptionsGetSpaceInfo(spaceId || undefined));

  const handleToggleOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  useEffect(() => {
    if (!isCollapsed) {
      handleCollapse(true);
    }
  }, []);

  useEffect(() => {
    if (spaceId && spaceInfo && (!currentSpace || String(currentSpace.id) !== spaceId)) {
      setCurrentSpace(spaceInfo);
    }
  }, [spaceId, spaceInfo, currentSpace, setCurrentSpace]);

  return (
    <section
      css={css`
        display: flex;
        overflow-x: hidden;
        height: 100vh;
      `}
    >
      <section
        css={css`
          width: ${isOverviewVisible ? "34.4rem" : "0"};
          opacity: ${isOverviewVisible ? 1 : 0};
          transition:
            width 0.3s ease-in-out,
            opacity 0.3s ease-in-out;
          overflow: hidden;
          will-change: width, opacity;
        `}
      >
        <AnalysisOverview spaceId={spaceId} />
      </section>

      <AnalysisDialog spaceId={spaceId} retrospectId={retrospectId} isOverviewVisible={isOverviewVisible} onToggleOverview={handleToggleOverview} />
    </section>
  );
}
