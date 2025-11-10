import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function Analyzing() {
  return (
    <section
      css={css`
        height: 76vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Icon icon="ic_new_clock" size={7.2} color={DESIGN_TOKEN_COLOR.gray500} />
      <Spacing size={2} />
      <Typography
        variant="title18Bold"
        color="gray900"
        css={css`
          text-align: center;
          white-space: pre-wrap;
        `}
      >
        {"분석을 진행하고 있어요 \n조금만 기다려주세요!"}
      </Typography>
      <Spacing size={1.2} />
      <Typography variant="body16Medium" color="gray500">
        시간이 조금 소요될 수 있어요
      </Typography>
    </section>
  );
}
