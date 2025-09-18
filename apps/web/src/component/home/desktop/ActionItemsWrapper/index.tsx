import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import ActionItemBox from "../ActionItemBox";

export default function ActionItemsWrapper() {
  return (
    <section
      css={css`
        margin-top: 4.8rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        id="action-item-title"
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.7rem;
        `}
      >
        <Typography
          variant="body15Bold"
          color="gray800"
          css={css`
            display: flex;
            align-items: center;

            &::after {
              content: "";
              width: 0.1rem;
              height: 0.9rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray500};
              margin-left: 0.7rem;
            }
          `}
        >
          실행목표
        </Typography>
        <Typography variant="body15SemiBold" color="gray800">
          {2}개의 실행목표가 진행중이에요
        </Typography>
      </section>

      {/* ---------- 실행목표 컨텐츠 ---------- */}
      <section
        id="action-item-contents"
        css={css`
          display: flex;
          justify-content: space-between;
          height: 27.6rem;
          margin-top: 1.2rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        <ActionItemBox />
        <ActionItemBox />
        <ActionItemBox />
      </section>
    </section>
  );
}
