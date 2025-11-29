import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";

export default function EmptyInProgressRetrospects() {
  const SkeletonBox = () => (
    <div
      css={css`
        height: 13.8rem;
        background-color: #eceff5;
        border-radius: 1.2rem;
        padding: 2.8rem 1.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #e1e8f5;
        opacity: 0.5;
      `}
    >
      <div
        css={css`
          width: 22.1rem;
          height: 1.8rem;
          background-color: #dee4ef;
          border-radius: 9.9rem;
        `}
      />

      <div
        css={css`
          width: 12.8rem;
          height: 1.8rem;
          background-color: #dee4ef;
          border-radius: 9.9rem;
        `}
      />

      <div
        css={css`
          display: flex;
          gap: 0.8rem;
        `}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            css={css`
              width: 1.7rem;
              height: 1.7rem;
              border-radius: 50%;
              background-color: #dee4ef;
            `}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
        padding-top: 1.2rem;
      `}
    >
      <SkeletonBox />

      <div
        css={css`
          position: relative;
        `}
      >
        <SkeletonBox />
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Typography variant="body14Medium" color="gray600">
            작성중인 회고가 없어요
          </Typography>
        </div>
      </div>

      <SkeletonBox />
    </div>
  );
}
