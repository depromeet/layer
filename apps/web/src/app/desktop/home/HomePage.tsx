import { Typography } from "@/component/common/typography";
import QuickActionButton from "@/component/home/QuickActionButton";
import { css } from "@emotion/react";

export function HomePage() {
  return (
    <section
      css={css`
        width: "100%";
      `}
    >
      <header
        css={css`
          padding-top: 4.5rem;
          margin: 0 auto;
          text-align: center;
        `}
      >
        <Typography color="gray900" variant="T2">
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
    </section>
  );
}
