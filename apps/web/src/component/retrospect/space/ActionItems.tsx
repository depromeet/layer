import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import GoalTab from "./GoalTab";
import GoalList from "./GoalList";
import { useState } from "react";

export default function ActionItems() {
  const [currentTab, setCurrentTab] = useState<"진행중" | "지난">("진행중");

  const handleCurrentTabClick = (tab: "진행중" | "지난") => {
    setCurrentTab(tab);
  };

  return (
    <section
      css={css`
        width: 100%;
        max-width: 30.6rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        padding: 1.8rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 1.2rem;
          margin-bottom: 1.2rem;
          border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        `}
      >
        <Typography variant="title16Bold">실행목표</Typography>
        <Icon icon="ic_info_transparent" size="2rem" />
      </div>

      <GoalTab currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />
      <GoalList currentTab={currentTab} />
    </section>
  );
}
