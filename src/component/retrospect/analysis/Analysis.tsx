import { css } from "@emotion/react";

import { TeamSatisfactionChart } from "./TeamSatisfactionChart";
import { GoalCompletionRateChart } from "./GoalCompletionRateChart";
import { InsightsBoxSection } from "./InsightsBoxSection";
import { Spacing } from "@/component/common/Spacing";

export const AnalysisContainer = () => {
  return (
    <>
      <div css={css``}>
        <Spacing size={2} />

        <InsightsBoxSection
          type="badPoints"
          insightArr={[
            {
              content: "string1",
              count: 3,
              type: "GOOD",
            },
            {
              content: "string2",
              count: 4,
              type: "GOOD",
            },
            {
              content: "string3",
              count: 5,
              type: "GOOD",
            },
          ]}
        />
        <Spacing size={2} />
        <TeamSatisfactionChart teamName={"떡잎마을방법대"} satisfactionCount={8} normalCount={12} regretCount={1} />
        <Spacing size={2} />
        <GoalCompletionRateChart teamName={"떡잎마을방법대"} goalCompletionRate={35} />
        <Spacing size={2} />
      </div>
    </>
  );
};
