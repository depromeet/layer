import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function ActionItemBox() {
  return (
    <section
      css={css`
        width: 27.7rem;
      `}
    >
      {/* ---------- 회고 제목 ---------- */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          padding: 1.6rem;
          border-radius: 0.8rem;
          flex: 1;
        `}
      >
        <Typography variant="title16Bold" color="gray900">
          중간발표 이후 회고
        </Typography>
        <Typography variant="body14Medium" color="gray500">
          떡잎방범대 | 회고 마감일 2024.06.30
        </Typography>
      </div>

      {/* ---------- 실행목표 리스트 ---------- */}
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 2.4rem;
          list-style: disc;
          padding-left: 2.6rem;
          margin-top: 2.4rem;
          gap: 2rem;

          li::marker {
            color: ${DESIGN_TOKEN_COLOR.gray400};
            font-size: 2rem;
          }
        `}
      >
        <li
          css={css`
            padding-left: 0.8rem;
          `}
        >
          <Typography variant="body16Medium" color="gray900">
            긴 회의시간 줄이기
          </Typography>
        </li>

        <li
          css={css`
            padding-left: 0.8rem;
          `}
        >
          <Typography variant="body16Medium" color="gray900">
            회의 후 내용 꼭 기록해두기
          </Typography>
        </li>

        <li
          css={css`
            padding-left: 0.8rem;
          `}
        >
          <Typography variant="body16Medium" color="gray900">
            '린 분석' 북 스터디 진행
          </Typography>
        </li>
      </ul>
    </section>
  );
}
