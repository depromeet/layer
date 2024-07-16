import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type Space = {
  imgUrl: string;
  spaceName: string;
  introduction: string;
  projectCategory: string;
  collaborationType: string;
  headCount: string;
};

type SpaceOverviewProps = {
  key: number;
  space: Space;
};
export function SpaceOverview({
  key,
  space: { imgUrl, spaceName, introduction, projectCategory, collaborationType, headCount },
}: SpaceOverviewProps) {
  return (
    <div
      key={key}
      css={css`
        width: 100%;
        height: auto;
        background-color: #ffffff;
        padding: 1.9rem 1.8rem 1.6rem 1.8rem;
        display: flex;
        gap: 1.6rem;
        border-radius: 1.2rem;
      `}
    >
      <div
        css={css`
          width: 4rem;
          height: 100%;
        `}
      >
        <img
          src={imgUrl}
          css={css`
            width: 4rem;
            height: 4rem;
            background-color: #eef2f9;
            border-radius: 100%;
          `}
        />
      </div>
      <div
        css={css`
          width: calc(100% - 5.6rem);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        <Typography variant="S2">{spaceName}</Typography>
        <Typography variant="B2" color="darkGray">
          {introduction}
        </Typography>
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 0.6rem;
          `}
        >
          <div
            css={css`
              display: flex;
              gap: 0.4rem;
            `}
          >
            <TagBox tagName={collaborationType} />
            <TagBox tagName={projectCategory} />
          </div>
          <div
            css={css`
              width: auto;
              height: 2rem;
              display: flex;
              align-items: center;
              gap: 0.4rem;
            `}
          >
            <Icon icon="ic_user" size="2rem" />
            <div
              css={css`
                margin-top: 0.3rem;
              `}
            >
              <Typography>{headCount}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type TagBoxProps = {
  tagName: string;
};

function TagBox({ tagName }: TagBoxProps) {
  return (
    <div
      css={css`
        width: auto;
        height: auto;
        background-color: #f1f3f5;
        padding: 0.4rem 0.8rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Typography variant="CAPTION" color="darkGrayText">
        {tagName}
      </Typography>
    </div>
  );
}
