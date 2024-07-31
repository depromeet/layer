import { css } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, TeamGoalView, CreateRetrospectiveSheet } from "@/component/space";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { spaceRestrospectFetch } from "@/api/Retrospect";

type SpacePageProps = {
  id: number;
  category: string;
  field: string;
  name: string;
  introduction: string;
  formId: number;
  memberCount: number;
};

type RestrospectType = {
  retrospectId: number;
  title: string;
  introduction: string;
  isWrite: boolean;
  retrospectStatus: "PROCEEDING" | "DONE";
  writeCount: number;
  totalCount: number;
};

export function SpacePage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { openBottomSheet } = useBottomSheet();
  const [restrospectArr, setRestrospectArr] = useState<RestrospectType[]>([]);

  useEffect(() => {
    if (spaceId) {
      spaceRestrospectFetch(Number(spaceId))
        .then((response) => {})
        .catch((error) => {});
    }
  }, [spaceId]);

  const proceedingRetrospects = restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING");
  const doneRetrospects = restrospectArr.filter((retrospect) => retrospect.retrospectStatus === "DONE");

  return (
    <DefaultLayout theme="dark" height="6.4rem" title="떡잎마을 방법대">
      <TeamGoalView />
      <Spacing size={1.1} />
      <SpaceCountView />
      <Spacing size={2.4} />
      <div
        css={css`
          width: calc(100% + 4rem);
          transform: translateX(-2rem);
          min-height: calc(100vh - 34rem);
          background-color: ${DESIGN_SYSTEM_COLOR.white};
          padding: 2.2rem 2rem;
        `}
      >
        {!proceedingRetrospects.length && !doneRetrospects.length && <>ss</>}

        {proceedingRetrospects.length !== 0 && (
          <>
            <div
              css={css`
                display: flex;
                gap: 0.6rem;
              `}
            >
              <Typography variant="B1_BOLD">진행중인 회고</Typography>
              <Typography variant="B1_BOLD" color="darkGray">
                {proceedingRetrospects.length}
              </Typography>
            </div>
            <Spacing size={1.6} />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 1rem;
              `}
            >
              {proceedingRetrospects.map((retrospect) => (
                <RetrospectBox key={retrospect.retrospectId} retrospect={retrospect} />
              ))}
            </div>
          </>
        )}

        <Spacing size={2} />

        {doneRetrospects.length !== 0 && (
          <div
            css={css`
              display: flex;
              gap: 0.6rem;
            `}
          >
            <Typography variant="B1_BOLD">완료된 회고</Typography>
            <Typography variant="B1_BOLD" color="darkGray">
              {doneRetrospects.length}
            </Typography>
            <Spacing size={1.6} />
          </div>
        )}

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          {doneRetrospects.map((retrospect) => (
            <RetrospectBox key={retrospect.retrospectId} retrospect={retrospect} />
          ))}
        </div>
      </div>
      <button
        onClick={openBottomSheet}
        css={css`
          width: 11.6rem;
          height: 4.8rem;
          background-color: #212529;
          position: fixed;
          bottom: 1.2rem;
          right: 2.4rem;
          border-radius: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
        `}
      >
        <Icon icon="ic_writePen" />
        <Typography color="white" variant="B2_SEMIBOLD">
          회고 생성
        </Typography>
      </button>
      <BottomSheet
        contents={
          <Fragment>
            <CreateRetrospectiveSheet teamName="떡잎마을방범대" />
          </Fragment>
        }
        handler={true}
      />
    </DefaultLayout>
  );
}
