import { css } from "@emotion/react";
import { useState } from "react";

import { GoalCompletionRateChart } from "./GoalCompletionRateChart";
import { InsightsBoxSection } from "./InsightsBoxSection";
import { TeamSatisfactionChart } from "./TeamSatisfactionChart";

import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Typography } from "@/component/common/typography";
import { useApiGetAnalysis } from "@/hooks/api/analysis/useApiGetAnalysis";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type AnalysisContainerProps = {
  spaceId: string;
  retrospectId: string;
};

export const AnalysisContainer = ({ spaceId, retrospectId }: AnalysisContainerProps) => {
  const { data, isLoading } = useApiGetAnalysis({ spaceId, retrospectId });
  const [selectedTab, setSelectedTab] = useState<"personal" | "team">("personal");
  console.log(data);
  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 2.8rem;
          margin-bottom: 3rem;
        `}
      >
        {data?.teamAnalyze && (
          <div
            css={css`
              width: 10rem;
              height: 4rem;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              background-color: ${DESIGN_TOKEN_COLOR.gray00};
              border-radius: 0.6rem;
              position: relative;
              overflow: hidden;
              margin-top: 2.4rem;
            `}
          >
            <div
              css={css`
                position: absolute;
                width: 4.8rem;
                height: 3.4rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray700};
                border-radius: 0.6rem;
                transition: transform 0.3s ease;
                transform: ${selectedTab === "team" ? "translateX(4.8rem)" : "translateX(0.1rem)"};
              `}
            />
            <button
              onClick={() => setSelectedTab("personal")}
              css={css`
                width: 4.8rem;
                height: 3.4rem;
                background-color: transparent;
                border-radius: 0.6rem;
                z-index: 1;
                position: relative;
              `}
            >
              <Typography variant="subtitle14SemiBold" color={selectedTab === "personal" ? "gray00" : "gray900"}>
                개인
              </Typography>
            </button>
            <button
              onClick={() => setSelectedTab("team")}
              css={css`
                width: 4.8rem;
                height: 3.4rem;
                background-color: transparent;
                border-radius: 0.6rem;
                z-index: 1;
                position: relative;
              `}
            >
              <Typography variant="subtitle14SemiBold" color={selectedTab === "team" ? "gray00" : "gray900"}>
                팀
              </Typography>
            </button>
          </div>
        )}

        {data?.teamAnalyze && selectedTab === "team" && (
          <>
            <TeamSatisfactionChart
              satisfactionLevels={[
                data.teamAnalyze.scoreOne,
                data.teamAnalyze.scoreTwo,
                data.teamAnalyze.scoreThree,
                data.teamAnalyze.scoreFour,
                data.teamAnalyze.scoreFive,
              ]}
            />
            <GoalCompletionRateChart goalCompletionRate={data.teamAnalyze.goalCompletionRate} />

            <InsightsBoxSection type="goodPoints" insightArr={data.teamAnalyze.goodPoints} />
            <InsightsBoxSection type="badPoints" insightArr={data.teamAnalyze.badPoints} />
            <InsightsBoxSection type="improvementPoints" insightArr={data.teamAnalyze.badPoints} />
          </>
        )}
        {data?.individualAnalyze && selectedTab === "personal" && (
          <>
            <InsightsBoxSection type="goodPoints" insightArr={data.individualAnalyze.goodPoints} />
            <InsightsBoxSection type="badPoints" insightArr={data.individualAnalyze.badPoints} />
            <InsightsBoxSection type="improvementPoints" insightArr={data.individualAnalyze.badPoints} />
          </>
        )}
      </div>
    </>
  );
};
