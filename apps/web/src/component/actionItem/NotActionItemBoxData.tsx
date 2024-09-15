import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";

import { Button } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useTestNatigate } from "@/lib/test-natigate";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";

export function NotActionItemBoxData() {
  const navigate = useTestNatigate();

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        border-radius: 1.2rem;
        box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
        background-color: white;
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          width: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ${ANIMATION.FADE_IN} ease 0.4s;
        `}
      >
        <Icon icon="ic_clock" size={8} />
        <Spacing size={2} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            text-align: center;
            row-gap: 0.3rem;

            span {
              ${DESIGN_TOKEN_TEXT.body15Medium};
              color: ${DESIGN_TOKEN_COLOR.gray600};
            }
          `}
        >
          <Typography>설정된 실행목표가 없어요!</Typography>
          <Typography>회고를 진행해 실행목표를 설정해보세요</Typography>
        </div>
        <Spacing size={3} />
        <Button
          onClick={() => {
            void navigate(PATHS.home());
          }}
          colorSchema={"outline"}
          css={css`
            width: fit-content;
            padding: 1.3rem 3.65rem;
          `}
        >
          <Typography variant={"subtitle16SemiBold"} color={"gray800"}>
            회고 진행하기
          </Typography>
        </Button>
      </div>
    </div>
  );
}
