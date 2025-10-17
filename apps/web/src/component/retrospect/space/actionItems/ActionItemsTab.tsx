import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type ActionItemsTabProps = {
  currentTab: "진행중" | "지난";
  handleCurrentTabClick: (tab: "진행중" | "지난") => void;
};

const ACTION_ITEMS_TAB_NAMES = ["진행중", "지난"] as const;

export default function ActionItemsTab({ currentTab, handleCurrentTabClick }: ActionItemsTabProps) {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
      `}
    >
      {ACTION_ITEMS_TAB_NAMES.map((tab) => (
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
          <Typography variant="subtitle14SemiBold" color={tab === currentTab ? "gray900" : "gray500"}>
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
}
