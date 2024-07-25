import { Fragment } from "react";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";

import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, TeamGoalView, CreateRetrospectiveSheet } from "@/component/space";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { Icon } from "@/component/common/Icon";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { BottomSheet } from "@/component/BottomSheet";

type SpacePageProps = {
  id: number;
  category: string;
  field: string;
  name: string;
  introduction: string;
  formId: number;
  memberCount: number;
};

export function SpacePage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { openBottomSheet, bottomSheetState } = useBottomSheet();

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
          height: fit-content;
          background-color: ${DESIGN_SYSTEM_COLOR.white};
          padding: 2.2rem 2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 0.6rem;
          `}
        >
          <Typography variant="B1_BOLD">진행중인 회고</Typography>
          <Typography variant="B1_BOLD" color="darkGray">
            1
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
          <RetrospectBox retrospectStatus="PROCEEDING" />
          <RetrospectBox retrospectStatus="PROCEEDING" />
        </div>
        <Spacing size={2} />
        <div
          css={css`
            display: flex;
            gap: 0.6rem;
          `}
        >
          <Typography variant="B1_BOLD">완료된 회고</Typography>
          <Typography variant="B1_BOLD" color="darkGray">
            1
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
          <RetrospectBox retrospectStatus="PROCEEDING" />
          <RetrospectBox retrospectStatus="DONE" />
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
