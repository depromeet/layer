import { Icon } from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import RetrospectsOverview from "./RetrospectsOverview";

import { TeamSatisfactionChart } from "@/component/retrospect/analysis/TeamSatisfactionChart";
import { TeamAnalyzeType } from "@/hooks/api/analysis/useApiGetAnalysis";
import { useSatisfactionData } from "@/hooks/useSatisfactionData";

const PADDING_SUM = 8;

type AnalysisTeamContentsProps = {
  teamAnalyze?: TeamAnalyzeType;
};

export default function AnalysisTeamContents({ teamAnalyze }: AnalysisTeamContentsProps) {
  // 만족도 데이터 처리
  const { dominantCategory } = useSatisfactionData(
    teamAnalyze
      ? [teamAnalyze.scoreFive, teamAnalyze.scoreFour, teamAnalyze.scoreThree, teamAnalyze.scoreTwo, teamAnalyze.scoreOne]
      : [5, 4, 3, 2, 1],
  );
  return (
    <section
      css={css`
        width: 100%;
        height: 59rem;
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
        padding: 2rem 3.2rem;
      `}
    >
      {/* ---------- 진행상황 ---------- */}
      <article>
        {/* ---------- 제목 ---------- */}
        <section
          css={css`
            display: flex;
            gap: 0.7rem;
            margin-bottom: 1.2rem;
          `}
        >
          <Typography
            variant="body14Strong"
            color="gray800"
            css={css`
              display: flex;
              align-items: center;

              &::after {
                content: "";
                width: 0.1rem;
                height: 1.4rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray400};
                margin-left: 0.7rem;
              }
            `}
          >
            진행상황
          </Typography>
          <Typography variant="body14SemiBold" color="gray800">
            우리팀의 진행상황에 대해 이렇게 생각해요!
          </Typography>
        </section>

        {/* ---------- 컨텐츠 ---------- */}
        <section
          css={css`
            width: 100%;
            height: 24rem;
            display: flex;
            flex-shrink: 0;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 1.2rem;
            padding: 2.4rem 2rem;
            gap: 2rem;
          `}
        >
          {/* ---------- 진행상황 만족도 ---------- */}
          <section
            css={css`
              position: relative;
              flex: 1;
              height: 100%;
              display: flex;
              flex-direction: column;
              gap: 1rem;

              /* ---------- 구분선 (Pseudo-element) ---------- */
              &::after {
                content: "";
                position: absolute;
                right: 0; /* 첫 번째 섹션의 오른쪽 끝에 배치 */
                top: 50%;
                transform: translateY(-50%) translateX(50%); /* 중앙으로 이동 */
                width: 1px;
                height: 100%; /* 전체 높이의 60% */
                background-color: ${DESIGN_TOKEN_COLOR.gray300};
              }
            `}
          >
            <div>
              <Typography variant="title18Bold" color="gray900">
                진행상황에 대해 대부분{" "}
              </Typography>
              <Typography variant="title18Bold" color="blue600">
                {dominantCategory}해요
              </Typography>
            </div>

            {/* ---------- 차트 컨테이너 ---------- */}
            {teamAnalyze && (
              <TeamSatisfactionChart
                satisfactionLevels={[
                  teamAnalyze.scoreFive,
                  teamAnalyze.scoreFour,
                  teamAnalyze.scoreThree,
                  teamAnalyze.scoreTwo,
                  teamAnalyze.scoreOne,
                ]}
                layout="compact"
                chartSize={{
                  width: 160,
                  height: 160,
                  innerRadius: 35,
                  outerRadius: 65,
                }}
                customStyles={{
                  container: css`
                    padding: 0;
                    background-color: transparent;
                    gap: 0;
                  `,
                  title: css`
                    display: none;
                  `,
                  chartContainer: css`
                    flex-direction: row;
                    justify-content: center;
                    gap: 6.3rem;
                    align-items: center;
                    width: 100%;
                  `,
                  legend: css`
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: auto;
                  `,
                }}
              />
            )}
          </section>

          {/* ---------- 목표달성률 ---------- */}
          {teamAnalyze && (
            <section
              css={css`
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 8rem;
              `}
            >
              <div>
                <Typography variant="title18Bold" color="gray900">
                  목표달성률은{" "}
                </Typography>
                {/* TODO: 실제 목표달성률 할당 */}
                <Typography variant="title18Bold" color="blue600">
                  {teamAnalyze.goalCompletionRate}%
                </Typography>

                <Typography variant="title18Bold" color="gray900">
                  에요
                </Typography>
              </div>

              {/* ---------- Progress bar ---------- */}
              <div
                css={css`
                  position: relative;
                  padding: 0 6rem;
                `}
              >
                {/* ---------- 말풍선 ---------- */}
                <div
                  css={css`
                    position: absolute;
                    top: -5rem;
                    left: ${teamAnalyze.goalCompletionRate - PADDING_SUM}%; /* 비율에 따라 동적 위치 */
                    transform: translateX(-50%); /* 중앙 정렬 */
                    background-color: white;
                    border-radius: 1.6rem;
                    padding: 0.4rem 0.8rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    z-index: 10;

                    /* ---------- 말풍선 꼬리 ---------- */
                    &::after {
                      content: "";
                      position: absolute;
                      bottom: -0.8rem;
                      left: 50%;
                      transform: translateX(-50%);
                      width: 0;
                      height: 0;
                      border-left: 0.8rem solid transparent;
                      border-right: 0.8rem solid transparent;
                      border-top: 0.8rem solid white;
                    }
                  `}
                >
                  <Icon icon="ic_person" size={2.0} color={DESIGN_TOKEN_COLOR.blue600} />
                  <Typography variant="title16Bold" color="gray900">
                    {teamAnalyze.goalCompletionRate}%
                  </Typography>
                </div>

                {/* ---------- 5구간 프로그레스 바 ---------- */}
                <div
                  css={css`
                    display: flex;
                    width: 100%;
                    gap: 0.46rem;
                    position: relative;
                  `}
                >
                  {[0, 1, 2, 3, 4].map((index) => {
                    // * 비율에 따라 각 구간의 채우기 정도 계산
                    const getSegmentFill = () => {
                      // 각 구간의 시작점 (0, 20, 40, 60, 80)
                      const segmentStart = index * 20;

                      // 각 구간의 끝점 (20, 40, 60, 80, 100)
                      const segmentEnd = (index + 1) * 20;

                      if (teamAnalyze.goalCompletionRate <= segmentStart) {
                        return 0; // 비율이 구간 시작점보다 작으면 비움
                      } else if (teamAnalyze.goalCompletionRate >= segmentEnd) {
                        return 1; // 비율이 구간 끝점보다 크면 완전히 채움
                      } else {
                        // 비율이 구간 내에 있으면 부분적으로 채움
                        return (teamAnalyze.goalCompletionRate - segmentStart) / 20;
                      }
                    };

                    const fillRatio = getSegmentFill();
                    const isFirstSegment = index === 0;
                    const isLastSegment = index === 4;

                    return (
                      <div
                        key={index}
                        css={css`
                          flex: 1;
                          height: 3rem;
                          background-color: white;
                          border-radius: ${isFirstSegment ? "1.5rem 0 0 1.5rem" : isLastSegment ? "0 1.5rem 1.5rem 0" : "0"};
                          position: relative;
                          overflow: hidden;
                        `}
                      >
                        {/* ---------- 채워진 부분 ---------- */}
                        <div
                          css={css`
                            width: ${fillRatio * 100}%;
                            height: 100%;
                            background-color: #6b9eff;
                            border-radius: inherit;
                            transition: width 0.3s ease;
                          `}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* ---------- 0% 텍스트 ---------- */}
                <span
                  css={css`
                    position: absolute;
                    bottom: -2.5rem;
                    left: 6rem;
                    font-size: 1.2rem;
                    color: ${DESIGN_TOKEN_COLOR.gray500};
                  `}
                >
                  0
                </span>

                {/* ---------- 100% 텍스트 ---------- */}
                <span
                  css={css`
                    position: absolute;
                    bottom: -2.5rem;
                    right: 6rem;
                    font-size: 1.2rem;
                    color: ${DESIGN_TOKEN_COLOR.gray500};
                  `}
                >
                  100
                </span>
              </div>
            </section>
          )}
        </section>
      </article>

      {/* ---------- 회고 ---------- */}
      {teamAnalyze && (
        <RetrospectsOverview
          description="우리팀은 이렇게 회고 하고 있어요!"
          goodPoints={teamAnalyze.goodPoints}
          badPoints={teamAnalyze.badPoints}
          improvementPoints={teamAnalyze.improvementPoints}
        />
      )}
    </section>
  );
}
