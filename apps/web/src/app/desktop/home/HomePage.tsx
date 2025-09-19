import { css } from "@emotion/react";

import HomePageHeader from "@/app/desktop/component/home/HomePageHeader";
import InProgressRetrospectsWrapper from "@/app/desktop/component/home/InProgressRetrospectsWrapper";
import ActionItemsWrapper from "@/app/desktop/component/home/ActionItemsWrapper";

export function HomePage() {
  return (
    <section
      css={css`
        width: "100%";
        margin: 0 auto;
        max-width: 92.8rem;
        min-width: 92.8rem;
      `}
    >
      {/* ---------- 헤더 ---------- */}
      <HomePageHeader />

      {/* ---------- 작성중인 회고 ---------- */}
      <InProgressRetrospectsWrapper />

      {/* ---------- 실행목표 ---------- */}
      <ActionItemsWrapper />
    </section>
  );
}
