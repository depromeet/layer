import ActionItems from "@/component/retrospect/space/actionItems/ActionItems";
import CompletedRetrospects from "@/component/retrospect/space/CompletedRetrospects";
import InProgressRetrospects from "@/component/retrospect/space/InProgressRetrospects";
import RetrospectSpaceHeader from "@/component/retrospect/space/RetrospectSpaceHeader";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { css } from "@emotion/react";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

export default function RetroSpectSpacePage() {
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  const setRetrospectValue = useSetAtom(retrospectInitialState);
  const [currentSpace, setCurrentSpace] = useAtom(currentSpaceState);

  const { data: spaceData, isSuccess } = useApiGetSpace(spaceId, false, {
    enabled: !currentSpace,
  });

  useEffect(() => {
    setRetrospectValue((prev) => ({
      ...prev,
      spaceId,
    }));
  }, [spaceId, setRetrospectValue]);

  useEffect(() => {
    if (isSuccess && spaceData) {
      setCurrentSpace((prev) => ({
        id: spaceData.id.toString(),
        category: spaceData.category,
        fieldList: prev?.fieldList ?? [],
        name: spaceData.name,
        introduction: spaceData.introduction,
        formId: spaceData.formId ?? prev?.formId ?? 0,
        formTag: prev?.formTag ?? null,
        bannerUrl: spaceData.bannerUrl,
        memberCount: spaceData.memberCount,
        leader: spaceData.leader,
        proceedingRetrospectCount: prev?.proceedingRetrospectCount ?? 0,
        retrospectCount: prev?.retrospectCount ?? 0,
      }));
    }
  }, [isSuccess, spaceData, setCurrentSpace]);

  return (
    <section
      css={css`
        width: 100%;
        height: 100vh;
        padding: 2.8rem 2rem 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        min-width: 92.8rem;
      `}
    >
      <RetrospectSpaceHeader />

      {/* 데스크탑 레이아웃 (980px 이상) */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          flex: 1;
          overflow: hidden;

          @media (max-width: 979px) {
            display: none;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 5rem;
          `}
        >
          <InProgressRetrospects />
          <CompletedRetrospects />
        </div>
        <ActionItems />
      </div>

      {/* 태블릿 레이아웃 (980px 미만) */}
      <div
        css={css`
          display: none;
          gap: 2.4rem;
          flex: 1;
          overflow-y: auto;

          @media (max-width: 979px) {
            display: flex;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4rem;
          `}
        >
          <InProgressRetrospects />
          <CompletedRetrospects />
        </div>
        <ActionItems />
      </div>
    </section>
  );
}
