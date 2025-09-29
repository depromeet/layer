import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { ANALYSIS_MENU_TABS, AnalysisTab } from ".";

type AnalysisHeaderProps = {
  selectedTab: AnalysisTab;
  handleTabClick: (tab: AnalysisTab) => void;
};

export default function AnalysisHeader({ selectedTab, handleTabClick }: AnalysisHeaderProps) {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
      `}
    >
      <section
        css={css`
          display: flex;
          gap: 1.2rem;
        `}
      >
        <Icon
          icon="ic_close"
          size={2.0}
          css={css`
            cursor: pointer;
          `}
        />
        <Icon
          icon="ic_expand"
          size={2.0}
          css={css`
            cursor: pointer;
          `}
        />
      </section>

      {/* TODO: 실제 회고 제목 적용 */}
      {/* ---------- 제목 ---------- */}
      <Typography variant="heading24Bold" color="gray900">
        중간발표 이후 회고
      </Typography>

      <div
        css={css`
          display: flex;
          gap: 1.2rem;
          overflow: hidden;
          transition:
            height 0.3s ease-in-out,
            opacity 0.3s ease-in-out,
            margin 0.3s ease-in-out;
          border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        `}
      >
        {ANALYSIS_MENU_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            css={css`
              position: relative;
              background: none;
              border: none;
              padding: 0.6rem 0rem;

              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background-color: ${DESIGN_TOKEN_COLOR.gray900};
                transform: scaleX(${tab === selectedTab ? 1 : 0});
                transition: transform 0.3s ease-in-out;
                transform-origin: center;
              }
            `}
          >
            <Typography variant="subtitle14SemiBold" color={tab === selectedTab ? "gray900" : "gray500"}>
              {tab}
            </Typography>
          </button>
        ))}
      </div>
    </section>
  );
}
