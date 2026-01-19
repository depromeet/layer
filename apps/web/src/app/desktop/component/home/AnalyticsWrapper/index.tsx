import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import AnalyticsBox from "../AnalyticsBox";
import { useApiGetMemberAnalysis } from "@/hooks/api/analysis/useApiGetMemberAnalysis";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { getAnalysisConfigEmpty } from "@/utils/analysis/getAnalysisConfig";
import { Icon } from "@/component/common/Icon";

export default function AnalyticsWrapper() {
  const { data: myAnalysis, isPending: isMyAnalysisPending, isError: isMyAnalysisError } = useApiGetMemberAnalysis();

  // 컨텐츠 렌더링 함수
  const renderContent = () => {
    // * ---------- 로딩 중일 때 ---------- * //
    if (isMyAnalysisPending) {
      return (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          <LoadingSpinner />
        </div>
      );
    }

    // * ---------- 에러가 발생했을 때 ---------- * //
    if (isMyAnalysisError) {
      return <Typography variant="body15Medium">분석 결과를 불러오는 중 오류가 발생했어요.</Typography>;
    }

    // * ---------- 데이터가 있을 때 ---------- * //
    if (myAnalysis) {
      if (myAnalysis.goodAnalyzes.length === 0 && myAnalysis.badAnalyzes.length === 0 && myAnalysis.improvementAnalyzes.length === 0) {
        return <AnalyticsWrapper.Onboarding />;
      }

      return (
        <>
          <AnalyticsBox type="good" analysis={myAnalysis.goodAnalyzes} />
          <AnalyticsBox type="bad" analysis={myAnalysis.badAnalyzes} />
          <AnalyticsBox type="improvement" analysis={myAnalysis.improvementAnalyzes} />
        </>
      );
    }

    // * ---------- 에러 또는 데이터 없음 ---------- * //
    return (
      <section
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        <Typography variant="body14Medium" color="gray700">
          분석 결과가 없습니다.
        </Typography>
      </section>
    );
  };

  return (
    <article
      css={css`
        margin-top: 4.8rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        id="action-item-title"
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.7rem;
        `}
      >
        <Typography
          variant="body15Bold"
          color="gray800"
          css={css`
            display: flex;
            align-items: center;

            &::after {
              content: "";
              width: 0.1rem;
              height: 0.9rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray500};
              margin-left: 0.7rem;
            }
          `}
        >
          분석
        </Typography>
        <Typography variant="body15SemiBold" color="gray800">
          {myAnalysis?.recentAnalyzes.length ?? 0}개의 회고가 진행 중이에요!
        </Typography>
      </section>

      {/* ---------- 분석 컨텐츠 ---------- */}
      <article
        css={css`
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-top: 1.2rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        {renderContent()}
      </article>
    </article>
  );
}

AnalyticsWrapper.Onboarding = function () {
  return (
    <section
      css={css`
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: space-between;
      `}
    >
      <AnalyticsWrapper.OnboardingItem type="good" />
      <AnalyticsWrapper.OnboardingItem type="bad" />
      <AnalyticsWrapper.OnboardingItem type="improvement" />
    </section>
  );
};

AnalyticsWrapper.OnboardingItem = function ({ type }: { type: "good" | "bad" | "improvement" }) {
  const config = getAnalysisConfigEmpty(type);

  const getPointByType = () => {
    switch (type) {
      case "good":
        return "회의 내용 문서화";
      case "bad":
        return "잦은 회의 늘어짐";
      case "improvement":
        return "설득력 갖추기";
      default:
        return "";
    }
  };

  return (
    <article
      css={css`
        width: 27.4rem;
        opacity: 0.3;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.3rem;
        `}
      >
        <div
          css={css`
            width: 4.4rem;
            height: 4.4rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
          `}
        >
          <Icon icon={config.emoji} size={config.iconSize} />
        </div>
        <Typography variant="title18Bold">{config.title}</Typography>
      </section>

      {/* ---------- 분석 내용 ---------- */}
      <section
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        <section
          css={css`
            display: flex;
            align-items: center;
            gap: 1.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            padding: 1.6rem;
            border-radius: 1.2rem;
          `}
        >
          <Icon icon={config.icon} color={DESIGN_TOKEN_COLOR.gray800} size={1.6} />
          <section
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex: 1;
              min-width: 0;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                flex: 1;
                min-width: 0;
              `}
            >
              <Typography variant="subtitle14SemiBold" color="gray800">
                {getPointByType()}
              </Typography>
              <Typography
                variant="body12SemiBold"
                color="gray600"
                css={css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                중간발표 이후 회고 | 떡잎방범대
              </Typography>
            </div>

            {/* TODO: Space 분석으로 이동 구현 */}
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.4rem;
                height: 2.4rem;
                border-radius: 50%;
              `}
            >
              <Icon icon="ic_after" size={1.2} color={DESIGN_TOKEN_COLOR.gray800} />
            </div>
          </section>
        </section>
      </section>
    </article>
  );
};
