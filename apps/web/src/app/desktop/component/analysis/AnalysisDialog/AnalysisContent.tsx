import { Typography } from "@/component/common/typography";
import { CAchievementTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function AnalysisContent() {
  return (
    <section
      css={css`
        display: flex;
        gap: 2rem;
      `}
    >
      <article
        css={css`
          width: 34rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          border-radius: 1.2rem;
          margin-top: 2rem;
          padding: 2rem 1.6rem;
        `}
      >
        <Typography variant="body15Normal" color="gray900">
          진행상황에 대해 얼마나 만족하나요?
        </Typography>

        <article>
          <CSatisfactionTemplate name="송채현" index={4} />
          <CSatisfactionTemplate name="송채현" index={4} />
          <CSatisfactionTemplate name="송채현" index={4} />
          <CSatisfactionTemplate name="송채현" index={4} />
          <CSatisfactionTemplate name="송채현" index={4} />
          <CSatisfactionTemplate name="송채현" index={4} />
        </article>
      </article>

      <article
        css={css`
          width: 34rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          border-radius: 1.2rem;
          margin-top: 2rem;
          padding: 2rem 1.6rem;
        `}
      >
        <Typography variant="body15Normal" color="gray900">
          목표했던 부분에 얼마나 달성했나요?
        </Typography>

        <article>
          <CAchievementTemplate name="송채현" index={4} />
          <CAchievementTemplate name="송채현" index={4} />
          <CAchievementTemplate name="송채현" index={4} />
          <CAchievementTemplate name="송채현" index={4} />
          <CAchievementTemplate name="송채현" index={4} />
          <CAchievementTemplate name="송채현" index={4} />
        </article>
      </article>
    </section>
  );
}
