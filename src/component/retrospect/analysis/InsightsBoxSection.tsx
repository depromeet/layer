import { css } from "@emotion/react";
import { useAtomValue } from "jotai";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { authAtom } from "@/store/auth/authAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { analysisType, Insight } from "@/types/analysis";

type InsightsBoxProps = {
  isTeam: boolean;
  type: analysisType;
  insightArr: Insight[];
};

export function InsightsBoxSection({ isTeam, type, insightArr }: InsightsBoxProps) {
  const user = useAtomValue(authAtom);
  if (insightArr === null) return;
  const oneInsight = insightArr[0].content;
  return (
    <div
      css={css`
        width: 100%;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        padding: 2.1rem 2.6rem;
        border-radius: 1.2rem;
      `}
    >
      <Typography
        variant="subtitle18SemiBold"
        color="gray900"
        css={css`
          line-height: 3.2rem;
        `}
      >
        {`${isTeam ? "우리팀" : user.name}`}은{" "}
        {type === "goodPoints" && (
          <>
            <Typography
              variant="title16Bold"
              color="blue600"
              css={css`
                padding: 0.4rem 0.8rem;
                border-radius: 0.5rem;
                width: auto;
                height: 3rem;
                border: 0.1rem solid ${DESIGN_TOKEN_COLOR.blue400};
              `}
            >
              {oneInsight}
            </Typography>{" "}
            를 <br /> 가장 잘 하고 있어요
          </>
        )}
        {type === "badPoints" && (
          <>
            <Typography
              variant="title16Bold"
              color="blue600"
              css={css`
                padding: 0.4rem 0.8rem;
                border-radius: 0.5rem;
                width: auto;
                height: 3rem;
                border: 0.1rem solid ${DESIGN_TOKEN_COLOR.blue400};
              `}
            >
              {oneInsight}
            </Typography>{" "}
            외 <br /> {insightArr.length}가지를 문제점으로 생각해요
          </>
        )}
        {type === "improvementPoints" && (
          <>
            <Typography
              variant="title16Bold"
              color="blue600"
              css={css`
                padding: 0.4rem 0.8rem;
                border-radius: 0.5rem;
                width: auto;
                height: 3rem;
                border: 0.1rem solid ${DESIGN_TOKEN_COLOR.blue400};
              `}
            >
              {oneInsight}
            </Typography>{" "}
            외 <br /> {insightArr.length}가지를 개선점으로 생각해요
          </>
        )}
      </Typography>
      <Spacing size={2.4} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        {insightArr.map(({ analyzeType, content, count }, i) => (
          <InsightBox key={i} analyzeType={analyzeType} content={content} count={count} isTeam={isTeam} />
        ))}
      </div>
      <Spacing size={1.6} />
    </div>
  );
}

function InsightBox({ analyzeType, content, count, isTeam }: Insight) {
  return (
    <div
      css={css`
        width: 100%;
        height: 6rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        border-radius: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.2rem;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1.2rem;
          height: 100%;
          align-items: center;
        `}
      >
        {analyzeType == "GOOD" && <Icon icon="ic_good_mark" size={2} />}
        {analyzeType == "BAD" && <Icon icon="ic_bad_mark" size={2} />}
        {analyzeType == "IMPROVEMENT" && <Icon icon="ic_improve_mark" size={2} />}
        <Typography variant="subtitle16SemiBold" color="gray800">
          {content}
        </Typography>
      </div>
      {isTeam && (
        <Typography
          variant="body14Medium"
          color="gray600"
          css={css`
            white-space: nowrap;
          `}
        >
          {count}명
        </Typography>
      )}
    </div>
  );
}
