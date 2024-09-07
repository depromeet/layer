import { css } from "@emotion/react";
import { forwardRef } from "react";

import spaceDefaultImg from "@/assets/imgs/space/spaceDefaultImg.png";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { TagBox } from "@/component/home";
import { useTestNatigate } from "@/lib/test-natigate";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Space } from "@/types/spaceType";

type SpaceOverviewProps = {
  space: Space;
};

const SpaceOverview = forwardRef<HTMLDivElement, SpaceOverviewProps>(
  ({ space: { id, category, bannerUrl, fieldList, name, introduction, memberCount } }, ref) => {
    const navigate = useTestNatigate();
    return (
      <div
        ref={ref}
        onClick={() => {
          navigate(`/space/${id}`);
        }}
        key={id}
        css={css`
          width: 100%;
          height: auto;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          padding: 1.9rem 1.8rem 1.6rem 1.8rem;
          display: flex;
          gap: 1.6rem;
          border-radius: 1.2rem;
          box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
          cursor: pointer;
          animation: ${ANIMATION.FADE_UP} 0.6s ease;
        `}
      >
        <div
          css={css`
            width: 4rem;
            height: 100%;
          `}
        >
          <img
            src={bannerUrl || spaceDefaultImg}
            onError={(e) => {
              e.currentTarget.src = spaceDefaultImg;
            }}
            css={css`
              width: 4rem;
              height: 4rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray600};
              border-radius: 100%;
              object-fit: cover;
            `}
          />
        </div>
        <div
          css={css`
            width: calc(100% - 5.6rem);
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          `}
        >
          <Typography variant="title18Bold">{name}</Typography>
          <Typography variant="body14Medium" color="gray600">
            {introduction}
          </Typography>
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-top: 1.4rem;
            `}
          >
            <div
              css={css`
                display: flex;
                gap: 0.4rem;
                width: 87%;
                overflow-x: auto;
                white-space: nowrap;
              `}
            >
              <TagBox tagName={category} />
              {fieldList.map((field, idx) => (
                <TagBox key={idx} tagName={field} />
              ))}
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
                <Typography variant="body12Medium" color="gray900">
                  {memberCount}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

SpaceOverview.displayName = "SpaceOverview";

export { SpaceOverview };
