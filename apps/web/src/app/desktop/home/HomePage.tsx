import { css } from "@emotion/react";

import HomePageHeader from "@/app/desktop/component/home/HomePageHeader";
import InProgressRetrospectsWrapper from "@/app/desktop/component/home/InProgressRetrospectsWrapper";
import ActionItemsWrapper from "@/app/desktop/component/home/ActionItemsWrapper";
import AnalyticsWrapper from "../component/home/AnalyticsWrapper";
import Onboarding from "../component/home/Onboarding";
import { useFirstTimeUser } from "../component/home/Onboarding/useFirstTimeUser";

export function HomePage() {
  const { isFirstTimeUser, dismiss: dismissFirstTimeUser } = useFirstTimeUser();

  return (
    <section
      css={css`
        width: "100%";
        margin: 0 auto;
        padding: 4.5rem 0;
        max-width: 92.8rem;
        min-width: 92.8rem;
      `}
    >
      {/* ---------- 헤더 ---------- */}
      <HomePageHeader />

      {/* ---------- 온보딩 ---------- */}
      {isFirstTimeUser && <Onboarding onClose={dismissFirstTimeUser} />}

      {/* ---------- 작성중인 회고 (첫 사용자에게는 숨김) ---------- */}
      {!isFirstTimeUser && <InProgressRetrospectsWrapper />}

      {/* ---------- 실행목표 ---------- */}
      <ActionItemsWrapper />

      {/* ---------- 분석 ---------- */}
      <AnalyticsWrapper />
    </section>
  );
}
