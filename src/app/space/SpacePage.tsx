import { css } from "@emotion/react";
import { useParams } from "react-router-dom";

import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { SpaceCountView, RetrospectBox, TeamGoalView } from "@/component/space";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

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
          <RetrospectBox retrospectStatus="COMPLETE" />
          <RetrospectBox retrospectStatus="COMPLETE" />
        </div>
      </div>
    </DefaultLayout>
  );
}
