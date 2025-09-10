import { css } from "@emotion/react";

import HomePageHeader from "@/component/home/HomePageHeader";
import InProgressRetrospectsWrapper from "@/component/home/InProgressRetrospectsWrapper";

export function HomePage() {
  return (
    <section
      css={css`
        width: "100%";
        margin: 0 auto;
        max-width: 92.8rem;
      `}
    >
      <HomePageHeader />

      <InProgressRetrospectsWrapper />
    </section>
  );
}
