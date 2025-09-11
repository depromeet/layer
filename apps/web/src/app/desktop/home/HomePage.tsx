import { css } from "@emotion/react";

import HomePageHeader from "@/component/home/desktop/HomePageHeader";
import InProgressRetrospectsWrapper from "@/component/home/desktop/InProgressRetrospectsWrapper";
import ActionItemsWrapper from "@/component/home/ActionItemsWrapper";

export function HomePage() {
  return (
    <section
      css={css`
        width: "100%";
        margin: 0 auto;
        max-width: 92.8rem;
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
