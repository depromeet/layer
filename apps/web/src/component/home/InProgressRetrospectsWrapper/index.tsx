import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import InProgressRetrospectCard from "../InProgressRetrospectCard";

// TODO: 실제 데이터로 교체
const DUMMY_RETROSPECTS = [
  {
    id: 1,
    title: "중간발표 이후 회고",
    description: "중간발표 과정 및 팀의 커뮤니케이션 과정",
    createdAt: "2024.07.30 10:00",
    memberCount: 4,
  },
  {
    id: 2,
    title: "중간발표 이후 회고",
    description: "중간발표 과정 및 팀의 커뮤니케이션 과정",
    createdAt: "2024.07.30 10:00",
    memberCount: 4,
  },
  {
    id: 3,
    title: "중간발표 이후 회고",
    description: "중간발표 과정 및 팀의 커뮤니케이션 과정",
    createdAt: "2024.07.30 10:00",
    memberCount: 4,
  },
];

export default function InProgressRetrospectsWrapper() {
  return (
    <section
      css={css`
        margin-top: 3.2rem;
        padding: 2.4rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <Typography variant="body15Bold" color="gray800">
        작성중인 회고 ({DUMMY_RETROSPECTS.length})
      </Typography>

      {/* ---------- 카드 그리드 ---------- */}
      <section
        css={css`
          margin-top: 1.6rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          max-width: 100%;
        `}
      >
        {DUMMY_RETROSPECTS.map((retrospect) => (
          <InProgressRetrospectCard
            key={retrospect.id}
            title={retrospect.title}
            description={retrospect.description}
            createdAt={retrospect.createdAt}
            memberCount={retrospect.memberCount}
          />
        ))}
      </section>
    </section>
  );
}
