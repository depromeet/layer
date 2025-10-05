import { css } from "@emotion/react";
import { useState } from "react";

import { GoalCompletionRateChart } from "./GoalCompletionRateChart";
import { InsightsBoxSection } from "./InsightsBoxSection";
import { TeamSatisfactionChart } from "./TeamSatisfactionChart";

import { EmptyList } from "@/component/common/empty";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useApiGetAnalysis } from "@/hooks/api/analysis/useApiGetAnalysis";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type AnalysisContainerProps = {
  spaceId: string;
  retrospectId: string;
  hasAIAnalyzed: boolean | undefined;
};

export function AnalysisContainer({ spaceId, retrospectId, hasAIAnalyzed }: AnalysisContainerProps) {
  const { data, isError, error, isLoading } = useApiGetAnalysis({ spaceId, retrospectId });

  if (isError) {
    console.log(error);
  }
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

  return (
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
            flex-shrink: 0;
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
              data.teamAnalyze.scoreFive,
              data.teamAnalyze.scoreFour,
              data.teamAnalyze.scoreThree,
              data.teamAnalyze.scoreTwo,
              data.teamAnalyze.scoreOne,
            ]}
          />
          <GoalCompletionRateChart goalCompletionRate={data.teamAnalyze.goalCompletionRate} />
          {data.teamAnalyze.goodPoints && <InsightsBoxSection type="goodPoints" insightArr={data.teamAnalyze.goodPoints} isTeam={true} />}
          {data.teamAnalyze.badPoints && <InsightsBoxSection type="badPoints" insightArr={data.teamAnalyze.badPoints} isTeam={true} />}
          {data.teamAnalyze.improvementPoints && (
            <InsightsBoxSection type="improvementPoints" insightArr={data.teamAnalyze.improvementPoints} isTeam={true} />
          )}
        </>
      )}
      {selectedTab === "personal" && (
        <>
          {data?.individualAnalyze?.badPoints == null &&
          data?.individualAnalyze?.goodPoints == null &&
          data?.individualAnalyze?.improvementPoints == null ? (
            <EmptyList
              message={
                <>
                  회고를 작성하지 않으셨거나 <br />
                  너무 적은 내용을 입력하셨어요
                </>
              }
              icon={"ic_empty_list"}
              iconSize={12}
            />
          ) : (
            <>
              {data?.individualAnalyze?.goodPoints && (
                <InsightsBoxSection type="goodPoints" insightArr={data.individualAnalyze.goodPoints} isTeam={false} />
              )}
              {data?.individualAnalyze?.badPoints && (
                <InsightsBoxSection type="badPoints" insightArr={data.individualAnalyze.badPoints} isTeam={false} />
              )}
              {data?.individualAnalyze?.improvementPoints && (
                <InsightsBoxSection type="improvementPoints" insightArr={data.individualAnalyze.improvementPoints} isTeam={false} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export function AnalysisingComp() {
  return (
    <div
      css={css`
        height: 100dvh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Icon icon="ic_logo_gray" size={8} />
      <Spacing size={2} />
      <Typography variant="title18Bold" color="gray900">
        AI가 회고 내용을 분석하고 있어요!
      </Typography>
      <Spacing size={3} />
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
