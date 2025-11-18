import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Insight } from "@/types/analysis";
import { css } from "@emotion/react";

type RetrospectsOverviewProps = {
  description: string;
  goodPoints: Insight[] | null;
  badPoints: Insight[] | null;
  improvementPoints: Insight[] | null;
};

type InsightSectionProps = {
  title: string;
  data: Insight[] | null;
  emptyMessage: string;
  iconName: "ic_good_mark" | "ic_bad_mark_red" | "ic_improve_blue_mark";
};

type InsightItemProps = {
  content: string;
  iconName: "ic_good_mark" | "ic_bad_mark_red" | "ic_improve_blue_mark";
};

/**
 * 잘 하고 있는 점, 부족한 점, 개선이 필요한 점이 없는 경우 표시되는 컴포넌트
 *
 * @param message 빈 상태 메시지
 * @returns
 */
const EmptyState = ({ message }: { message: string }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 2rem;
    `}
  >
    <Typography variant="body14Medium" color="gray500">
      {message}
    </Typography>
  </div>
);

/**
 * 인사이트 아이템 컴포넌트
 * 잘 하고 있는 점 / 부족한 점 / 개선이 필요한 점 리스트에서 사용
 *
 * @param content 아이템 내용
 * @param iconName 아이콘 이름
 * @returns
 */
const InsightItem = ({ content, iconName }: InsightItemProps) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      gap: 1.2rem;
      height: 4.4rem;
      padding: 1.2rem 1.6rem;
      background-color: white;
      border-radius: 0.8rem;
    `}
  >
    <Icon icon={iconName} size={1.6} />
    <Typography variant="subtitle14Bold" color="gray800">
      {content}
    </Typography>
  </div>
);

/**
 * 인사이트(잘 하고 있는 점, 부족한 점, 개선이 필요한 점) 섹션 컴포넌트
 *
 * @param title 섹션 제목
 * @param data 섹션 데이터
 * @param emptyMessage 데이터가 없을 때 표시할 메시지
 * @param iconName 아이콘 이름
 * @returns
 */
const InsightSection = ({ title, data, emptyMessage, iconName }: InsightSectionProps) => {
  const isEmpty = data === null || data.length === 0;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        flex: 1;
      `}
    >
      <Typography variant="title16Bold" color="gray900">
        {title}
      </Typography>
      {isEmpty ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `}
        >
          {data.map((item, index) => (
            <InsightItem key={index} content={item.content} iconName={iconName} />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * 회고 개요 컴포넌트
 *
 * @param description 회고 설명
 * @param goodPoints 잘 하고 있는 점
 * @param badPoints 부족한 점
 * @param improvementPoints 개선이 필요한 점
 * @returns
 */
export default function RetrospectsOverview({ description, goodPoints, badPoints, improvementPoints }: RetrospectsOverviewProps) {
  return (
    <article>
      {/* ---------- 제목 ---------- */}
      <section
        css={css`
          display: flex;
          gap: 0.7rem;
          margin-bottom: 1.2rem;
        `}
      >
        <Typography
          variant="body14Strong"
          color="gray800"
          css={css`
            display: flex;
            align-items: center;

            &::after {
              content: "";
              width: 0.1rem;
              height: 1.4rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray400};
              margin-left: 0.7rem;
            }
          `}
        >
          회고
        </Typography>
        <Typography variant="body14SemiBold" color="gray800">
          {description}
        </Typography>
      </section>

      {/* ---------- 컨텐츠 ---------- */}
      <section
        css={css`
          width: 100%;
          height: 24rem;
          display: flex;
          flex-shrink: 0;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          border-radius: 1.2rem;
          padding: 2.4rem 2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 2.4rem;
            width: 100%;
            height: 100%;
          `}
        >
          <InsightSection title="잘 하고 있어요" data={goodPoints} emptyMessage="잘하고 있는 점이 없어요." iconName="ic_good_mark" />

          <InsightSection title="이런 점은 부족해요" data={badPoints} emptyMessage="부족한 점이 없어요." iconName="ic_bad_mark_red" />

          <InsightSection
            title="개선이 필요해요"
            data={improvementPoints}
            emptyMessage="개선이 필요한 점이 없어요."
            iconName="ic_improve_blue_mark"
          />
        </div>
      </section>
    </article>
  );
}
