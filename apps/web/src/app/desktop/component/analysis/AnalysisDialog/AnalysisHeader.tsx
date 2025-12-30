import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { TEAM_ANALYSIS_MENU_TABS, PERSONAL_ANALYSIS_MENU_TABS, AnalysisTab } from ".";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATHS } from "@layer/shared";
import { useEffect, useRef } from "react";
import { useNavigation } from "@/component/common/LocalNavigationBar/context/NavigationContext";

type AnalysisHeaderProps = {
  selectedTab: AnalysisTab;
  isPersonal: boolean;
  isOverviewVisible: boolean;
  handleTabClick: (tab: AnalysisTab) => void;
  onToggleOverview: () => void;
};

export default function AnalysisHeader({ selectedTab, isPersonal, isOverviewVisible, handleTabClick, onToggleOverview }: AnalysisHeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isCollapsed, toggleCollapse } = useNavigation();

  const title = searchParams.get("title");
  const spaceId = searchParams.get("spaceId");

  const menuTabs = isPersonal ? PERSONAL_ANALYSIS_MENU_TABS : TEAM_ANALYSIS_MENU_TABS;

  const originalIsCollapsedRef = useRef<boolean>(isCollapsed);

  const handleClose = () => {
    if (isCollapsed && !originalIsCollapsedRef.current) {
      toggleCollapse();
    }

    navigate(PATHS.spaceDetail(spaceId as string));
  };

  useEffect(() => {
    originalIsCollapsedRef.current = isCollapsed;
  }, []);

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
          icon="ic_analysis_close"
          size={2.0}
          css={css`
            cursor: pointer;
          `}
          onClick={handleClose}
        />
        <Icon
          icon={isOverviewVisible ? "ic_expand" : "ic_shrink"}
          size={2.0}
          onClick={onToggleOverview}
          css={css`
            cursor: pointer;
          `}
        />
      </section>

      {/* ---------- 제목 ---------- */}
      <Typography variant="heading24Bold" color="gray900">
        {title}
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
        {menuTabs.map((tab) => (
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
