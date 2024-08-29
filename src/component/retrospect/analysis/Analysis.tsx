import { css } from "@emotion/react";
import { useState } from "react";

import { GoalCompletionRateChart } from "./GoalCompletionRateChart";
import { InsightsBoxSection } from "./InsightsBoxSection";
import { TeamSatisfactionChart } from "./TeamSatisfactionChart";

import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Typography } from "@/component/common/typography";
import { useApiGetAnalysis } from "@/hooks/api/analysis/useApiGetAnalysis";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type AnalysisContainerProps = {
  spaceId: string;
  retrospectId: string;
  hasAIAnalyzed: boolean | undefined;
};

export function AnalysisContainer({ spaceId, retrospectId, hasAIAnalyzed }: AnalysisContainerProps) {
  const { data, isLoading } = useApiGetAnalysis({ spaceId, retrospectId });
  const [selectedTab, setSelectedTab] = useState<"personal" | "team">("personal");
  if (isLoading) {
    return <LoadingModal />;
  }
  {
    /**분석이 진행중일 때**/
  }
  if (hasAIAnalyzed == false) {
    return <AnalysisingComp />;
  }
  {
    /**분석이 결과가 아무것도 없을 때**/
  }
  if (data?.individualAnalyze.badPoints === null && data?.individualAnalyze.goodPoints === null && data?.individualAnalyze.improvementPoints === null)
    return <EmptyAnalysisComp />;

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 2.8rem;
          margin-bottom: 3rem;
          padding-top: 2.4rem;
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

            <InsightsBoxSection type="goodPoints" insightArr={data.teamAnalyze.goodPoints} isTeam={true} />
            <InsightsBoxSection type="badPoints" insightArr={data.teamAnalyze.badPoints} isTeam={true} />
            <InsightsBoxSection type="improvementPoints" insightArr={data.teamAnalyze.badPoints} isTeam={true} />
          </>
        )}
        {data?.individualAnalyze && selectedTab === "personal" && (
          <>
            <InsightsBoxSection type="goodPoints" insightArr={data.individualAnalyze.goodPoints} isTeam={false} />
            <InsightsBoxSection type="badPoints" insightArr={data.individualAnalyze.badPoints} isTeam={false} />
            <InsightsBoxSection type="improvementPoints" insightArr={data.individualAnalyze.badPoints} isTeam={false} />
          </>
        )}
      </div>
    </>
  );
}

function EmptyAnalysisComp() {
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3.5rem;
      `}
    >
      <Icon
        icon="ic_empty_analysis"
        size={9.1}
        css={css`
          position: relative;
          left: 1rem;
        `}
      />
      <Typography
        variant="body16Medium"
        color="gray600"
        css={css`
          text-align: center;
        `}
      >
        회고 내용이 짧아
        <br />
        분석을 할 수 없어요
      </Typography>
    </div>
  );
}

function AnalysisingComp() {
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
      `}
    >
      <Typography variant="title18Bold" color="gray900">
        AI가 회고 내용을 분석하고 있어요!
      </Typography>

      <div
        css={css`
          width: 100%;
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <Typography variant="body16Medium" color="gray500">
          잠시만 기다려주세요
        </Typography>
        <Typography variant="body16Medium" color="gray500">
          최대 1분까지 소요될 수 있어요
        </Typography>
      </div>
    </div>
  );
}
