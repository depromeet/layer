import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

import { DefaultLayout } from "@/layout/DefaultLayout";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";

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
          height: calc(100vh - 34rem);
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
            width: 100%;
            height: 13.8rem;
            background-color: #f0f4fe;
            border-radius: 1rem;
          `}
        ></div>
      </div>
    </DefaultLayout>
  );
}

function TeamGoalView() {
  return (
    <div
      css={css`
        width: 100%;
        height: 16.9rem;
        background-color: ${DESIGN_SYSTEM_COLOR.white};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography variant="B2_SEMIBOLD">실행목표</Typography>
        <Typography variant="B2_MEDIUM" color="darkGray">
          더보기
        </Typography>
      </div>
      <Spacing size={1.0} />
      <Icon icon="ic_folder" size="5.7rem" />
      <Spacing size={1.9} />
      <Typography variant="CAPTION" color="darkGray">
        회고 완료 후 실행목표를 설정해보세요.
      </Typography>
    </div>
  );
}

function SpaceCountView() {
  return (
    <div
      css={css`
        width: 100%;
        height: 7.2rem;
        background-color: ${DESIGN_SYSTEM_COLOR.white};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1.2rem;
          align-items: center;
        `}
      >
        <Icon icon="ic_earth" size={2.8} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          `}
        >
          <Typography variant="CAPTION">쌓인 회고</Typography>
          <Typography variant="B2_SEMIBOLD">1개</Typography>
        </div>
      </div>

      <div
        css={css`
          width: 1px;
          height: 2.6rem;
          background-color: #dee2e6;
        `}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon icon="ic_team" size={2.9} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            margin-left: 1.5rem;
            margin-right: 1rem;
          `}
        >
          <Typography variant="CAPTION">팀원</Typography>
          <Typography variant="B2_SEMIBOLD">11명</Typography>
        </div>
        <Icon icon="ic_after" size={1.6} />
      </div>
    </div>
  );
}
