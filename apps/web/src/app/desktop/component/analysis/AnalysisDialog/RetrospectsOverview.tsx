import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Insight } from "@/types/analysis";
import { css } from "@emotion/react";

type RetrospectsOverviewProps = {
  description: string;
  goodPoints: Insight[];
  badPoints: Insight[];
  improvementPoints: Insight[];
};

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
        {/* ---------- 회고 내용 3개 컬럼 ---------- */}
        <div
          css={css`
            display: flex;
            gap: 2.4rem;
            width: 100%;
            height: 100%;
          `}
        >
          {/* ---------- 잘 하고 있어요 ---------- */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2rem;
              flex: 1;
            `}
          >
            <Typography variant="title16Bold" color="gray900">
              잘 하고 있어요
            </Typography>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
              `}
            >
              {goodPoints.map((item, index) => (
                <div
                  key={index}
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
                  <Icon icon="ic_good_mark" size={1.6} />
                  <Typography variant="subtitle14Bold" color="gray800">
                    {item.content}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- 이런 점은 부족해요 ---------- */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2rem;
              flex: 1;
            `}
          >
            <Typography variant="title16Bold" color="gray900">
              이런 점은 부족해요
            </Typography>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
              `}
            >
              {badPoints.map((item, index) => (
                <div
                  key={index}
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
                  <Icon icon="ic_bad_mark_red" size={1.6} />
                  <Typography variant="subtitle14Bold" color="gray800">
                    {item.content}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- 개선이 필요해요 ---------- */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2rem;
              flex: 1;
            `}
          >
            <Typography variant="title16Bold" color="gray900">
              개선이 필요해요
            </Typography>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
              `}
            >
              {improvementPoints.map((item, index) => (
                <div
                  key={index}
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
                  <Icon icon="ic_improve_blue_mark" size={1.6} />
                  <Typography variant="subtitle14Bold" color="gray800">
                    {item.content}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
