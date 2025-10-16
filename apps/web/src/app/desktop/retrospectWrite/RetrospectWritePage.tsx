import AnalysisOverview from "../component/analysis/AnalysisOverview";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { retrospectWriteAtom } from "@/store/retrospect/retrospectWrite";
import RetrospectWrite from "../component/retrospectWrite";

function RetroSpectWritePage() {
  const { spaceId } = useAtomValue(retrospectWriteAtom);

  return (
    <div
      css={css`
        display: flex;
        overflow-x: hidden;
        height: 100vh;
      `}
    >
      {/* TODO: 동일한 부분인거같은데 그대로 사용해도 될지.. */}
      <AnalysisOverview spaceId={String(spaceId)} />
      <RetrospectWrite />
    </div>
  );
}

export default RetroSpectWritePage;
