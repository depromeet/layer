import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import Tooltip from "@/component/common/Tooltip";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type ActionItemsTabProps = {
  currentTab: "팀" | "개인";
  handleCurrentTabClick: (tab: "팀" | "개인") => void;
};

const ACTION_ITEMS_TAB_NAMES = ["팀", "개인"] as const;

export default function ActionItemsTab({ currentTab, handleCurrentTabClick }: ActionItemsTabProps) {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
      `}
    >
      {ACTION_ITEMS_TAB_NAMES.map((tab) => {
        const tabButton = (
          <button
            key={tab}
            onClick={() => handleCurrentTabClick(tab)}
            css={css`
              position: relative;
              background: none;
              border: none;
              padding: 0.8rem 0rem;
              cursor: pointer;

              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background-color: ${DESIGN_TOKEN_COLOR.gray900};
                transform: scaleX(${tab === currentTab ? 1 : 0});
                transition: transform 0.3s ease-in-out;
                transform-origin: center;
              }
            `}
          >
            <Typography variant="subtitle14Bold" color={tab === currentTab ? "gray900" : "gray500"}>
              {tab}
            </Typography>
          </button>
        );

        // * 개인 탭은 호버 시 NEW 안내 툴팁을 노출한다.
        if (tab === "개인") {
          return (
            <Tooltip key={tab} placement="bottom" align="start">
              <Tooltip.Trigger>{tabButton}</Tooltip.Trigger>
              <Tooltip.Content tag="NEW" arrow>
                팀 회고 속 나의 목표를 관리해보세요.
              </Tooltip.Content>
            </Tooltip>
          );
        }

        return tabButton;
      })}
    </div>
  );
}
