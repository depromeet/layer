import { css } from "@emotion/react";
import { forwardRef } from "react";

import spaceDefaultImg from "@/assets/imgs/space/spaceDefaultImg.png";
import { Typography } from "@/component/common/typography";
import { useTestNatigate } from "@/lib/test-natigate";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { Space } from "@/types/spaceType";
import StatusChips from "@/component/common/StatusChips";
import { PATHS } from "@layer/shared";
import { useApiPostSpacesClick } from "@/hooks/api/backoffice/useApiPostSpacesClick";

type SpaceOverviewProps = {
  space: Space;
};

const SpaceOverview = forwardRef<HTMLDivElement, SpaceOverviewProps>(
  ({ space: { id, bannerUrl, name, introduction, memberCount, proceedingRetrospectCount, retrospectCount } }, ref) => {
    const navigate = useTestNatigate();
    const { mutate: postSpacesClick } = useApiPostSpacesClick();

    return (
      <div
        ref={ref}
        onClick={() => {
          postSpacesClick(Number(id));
          navigate(PATHS.spaceDetail(id));
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
            gap: 0.6rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;

              & > div:nth-of-type(1) {
                margin-left: auto;
              }
            `}
          >
            <Typography variant="title16Bold">{name}</Typography>
            {proceedingRetrospectCount > 0 && <StatusChips> 진행 중 {proceedingRetrospectCount} </StatusChips>}
          </div>
          <Typography variant="body14Medium" color="gray600">
            {introduction}
          </Typography>
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 0.2rem;
            `}
          >
            <div
              css={css`
                ${DESIGN_TOKEN_TEXT.body12Medium};
                display: flex;
                gap: 0.4rem;
                overflow-x: auto;
                white-space: nowrap;
                color: ${DESIGN_TOKEN_COLOR.gray600};
              `}
            >
              <span> 멤버 {memberCount}명</span>
              <span> · </span>
              <span> 회고 {retrospectCount}개</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

SpaceOverview.displayName = "SpaceOverview";

export { SpaceOverview };
