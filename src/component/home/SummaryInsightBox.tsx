import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { authAtom } from "@/store/auth/authAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Point, OriginalPoint, TransformPoint, analysisItemType } from "@/types/analysis";

type SummaryInsightBoxProps = {
  type: analysisItemType;
  insightArr: Point[];
};

export function SummaryInsightBox({ type, insightArr }: SummaryInsightBoxProps) {
  const transformPoints = transformPointsFun(insightArr);

  return (
    <div
      css={css`
        width: 100%;
        box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        padding: 2.2rem 2rem;
      `}
    >
      <SummaryInsightIntro
        type={type}
        insight={transformPoints.map((v) => {
          return v.point;
        })}
      />
      <div
        css={css`
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        {transformPoints.map((point, idx) => (
          <InsightBox key={idx} insight={point} />
        ))}
      </div>
    </div>
  );
}

function SummaryInsightIntro({ type, insight }: { type: analysisItemType; insight: string[] }) {
  const [auth] = useAtom(authAtom);
  console.log("타입:", type);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      `}
    >
      <Typography variant="title18Bold">최근 회고에서 {auth.name}님은 </Typography>
      {insight.length == 1 && (
        <>
          <Typography variant="title18Bold">
            <BlueTextBox>{insight[0]}</BlueTextBox> 을 {getMessageByType(type)}
          </Typography>
        </>
      )}

      {insight.length >= 2 && (
        <>
          <Typography variant="title18Bold">
            {insight.map((v, idx) => (
              <span
                key={idx}
                css={css`
                  line-height: 1.8;
                `}
              >
                <BlueTextBox>{v}</BlueTextBox>
                {idx < insight.length - 1 && idx === insight.length - 2 ? " 와 " : idx < insight.length - 2 ? " , " : " "}
              </span>
            ))}
            을
          </Typography>
          <Typography variant="title18Bold">{getMessageByType(type)}</Typography>
        </>
      )}
    </div>
  );
}

function BlueTextBox({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="title16Bold"
      color="blue600"
      css={css`
        height: 3rem;
        border: 0.86px solid ${DESIGN_TOKEN_COLOR.blue400};
        border-radius: 0.5rem;
        padding: 0.4rem 0.6rem;
        white-space: nowrap;
      `}
    >
      {children}
    </Typography>
  );
}

function InsightBox({ insight }: { insight: TransformPoint }) {
  const { spaceId, retrospectId, spaceName, retrospectTitle, point } = insight;
  const navigate = useNavigate();
  const goAnalysisPage = () => {
    navigate(PATHS.retrospectAnalysis(spaceId.toString(), retrospectId));
  };

  return (
    <div
      onClick={goAnalysisPage}
      css={css`
        width: 100%;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        padding: 1.2rem 1.6rem 1.2rem 2rem;
        border-radius: 1.2rem;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1.5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={css`
              background-color: ${DESIGN_TOKEN_COLOR.gray800};
              border-radius: 100%;
              width: 1.6rem;
              height: 1.6rem;
              display: flex;
              justify-content: center;
              align-content: center;
            `}
          >
            <Icon
              icon="ic_check"
              size={1.2}
              color={DESIGN_TOKEN_COLOR.gray00}
              css={css`
                padding-top: 0.1rem;
              `}
            />
          </div>
        </div>
        <div
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          `}
        >
          <Typography variant="subtitle16SemiBold" color="gray900">
            {point}
          </Typography>
          <Typography variant="body13Medium" color="gray500">
            {retrospectTitle} | {spaceName}
          </Typography>
        </div>
      </div>
      <Icon icon="ic_after" size={1.6} color={DESIGN_TOKEN_COLOR.gray900} />
    </div>
  );
}

function transformPointsFun(points: OriginalPoint[]) {
  return points
    .map((point) => {
      const pointValue =
        "goodPoint" in point ? point.goodPoint : "improvementPoint" in point ? point.improvementPoint : "badPoint" in point ? point.badPoint : null;
      return pointValue ? { ...point, point: pointValue } : null;
    })
    .filter((point) => point !== null) as TransformPoint[];
}

function getMessageByType(type: analysisItemType): string {
  switch (type) {
    case "BAD":
      return "문제점으로 생각해요";
    case "IMPROVEMENT":
      return "개선점으로 생각해요";
    default:
      return "가장 잘 하고 있어요";
  }
}
