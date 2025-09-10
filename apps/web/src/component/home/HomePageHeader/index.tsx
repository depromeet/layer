import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import QuickActionButton from "../QuickActionButton";

export default function HomePageHeader() {
  return (
    <header
      css={css`
        padding-top: 4.5rem;
        margin: 0 auto;
        text-align: center;
      `}
    >
      <Typography color="gray900" variant="heading28Bold">
        내 회고 리포트
      </Typography>

      <section
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;
          margin-top: 1.5rem;
        `}
      >
        <QuickActionButton action="작성 예정 회고보기" />
        <QuickActionButton action="회고 생성하기" />
        <QuickActionButton action="회고 작성하기" />
      </section>
    </header>
  );
}
