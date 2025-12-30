import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function AdvanceQuestions() {
  return (
    <section>
      <Typography variant="title16Bold">사전 질문</Typography>
      <Spacing size={1.2} />
      <section
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem 1.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 0.8rem;
            height: 5rem;
          `}
        >
          <Icon icon="ic_star_with_cirecle" />
          <Typography variant="body14SemiBold" color="gray700">
            진행상황에 대해 얼마나 만족하나요?
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem 1.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 0.8rem;
            height: 5rem;
          `}
        >
          <Icon icon="ic_star_with_cirecle" />
          <Typography variant="body14SemiBold" color="gray700">
            목표했던 부분에 얼마나 달성했나요?
          </Typography>
        </div>
      </section>
    </section>
  );
}
