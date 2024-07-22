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
      <div
        css={css`
          width: 100%;
          height: 7.2rem;
          background-color: ${DESIGN_SYSTEM_COLOR.white};
          border: 1px solid rgba(33, 37, 41, 0.08);
          border-radius: 1.2rem;
          padding: 2.3rem 3.2rem;
        `}
      ></div>
      <Spacing size={2.4} />
      <div
        css={css`
          width: calc(100% + 4rem);
          transform: translateX(-2rem);
          height: calc(100vh - 6.4rem - 1.1rem - 7.2rem - 2.4rem - 16.9rem);
          background-color: ${DESIGN_SYSTEM_COLOR.white};
          padding: 2.2rem 2rem;
        `}
      >
        ss
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
