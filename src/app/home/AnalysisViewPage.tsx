import { css } from "@emotion/react";

import { UserProfileIcon } from "@/component/common/appBar";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";

export function AnalysisViewPage() {
  // const { tabs, curTab, selectTab } = useTabs(["실행중", "지난"] as const);
  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="heading24Bold">
          실행목표
        </Typography>
      }
      RightComp={<UserProfileIcon />}
    >
      {/*<Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />*/}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding-top: 1.6rem;
          row-gap: 1.2rem;
          padding-bottom: calc(var(--nav-bar-height) + 2rem);
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 100%;
            background: white;
            border-radius: 1.2rem;
            box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
          `}
        >
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              row-gap: 1.6rem;
              animation: ${ANIMATION.FADE_IN} ease 0.4s;
            `}
          >
            <Icon icon={"ic_very_good"} size={6} />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                text-align: center;

                span {
                  ${DESIGN_TOKEN_TEXT.body16Medium}
                  color: ${DESIGN_TOKEN_COLOR.gray600};
                }
              `}
            >
              <Typography>출시 예정이에요</Typography>
              <Typography>조금만 기다려주세요</Typography>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
