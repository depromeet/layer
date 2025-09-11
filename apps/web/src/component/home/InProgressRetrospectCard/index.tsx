import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface InProgressRetrospectCardProps {
  title: string;
  description: string;
  createdAt: string;
  memberCount?: number;
}

export default function InProgressRetrospectCard({ title, description, createdAt, memberCount = 0 }: InProgressRetrospectCardProps) {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 13.8rem;
        padding: 1.6rem;
        background-color: white;
        border-radius: 1.2rem;
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover {
          border-color: #e9ecef;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}
    >
      {/* ---------- 상단 라벨 ---------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 2.2rem;
            padding: 0.3rem 0.6rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray200};
            border-radius: 0.4rem;
            border: 0.0883rem solid;
            border-color: ${DESIGN_TOKEN_COLOR.gray400};
          `}
        >
          <Typography variant="caption11Medium" color="gray700">
            작성 전
          </Typography>
        </div>
        <Icon icon="ic_more" size={2.0} color={DESIGN_TOKEN_COLOR.gray500} />
      </div>

      {/* ---------- 제목 ---------- */}
      <Typography variant="body15Bold" color="gray900">
        {title}
      </Typography>

      {/* ---------- 설명 ----------*/}
      <div
        css={css`
          margin-top: 0.8rem;
          flex: 1;
        `}
      >
        <Typography
          variant="body12SemiBold"
          color="gray800"
          css={css`
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {description}
        </Typography>
      </div>

      {/* ---------- 하단 정보 ---------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography variant="body12SemiBold" color="gray500">
          마감 예정 | {createdAt}
        </Typography>

        {memberCount > 0 && (
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.2rem;
            `}
          >
            <Icon icon="ic_person" size={1.8} color={DESIGN_TOKEN_COLOR.blue600} />
            <Typography variant="body12SemiBold" color="gray500">
              {memberCount} / {10}
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
}
