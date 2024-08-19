import { css } from "@emotion/react";

import temp from "@/assets/temp.png";
import { Button } from "@/component/common/button";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";

export function NotActionItemBoxData() {
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
        {/* FIXME: 변경된 이미지로 변경 */}
        <img
          src={temp}
          css={css`
            width: 13rem;
            height: auto;
          `}
        />
        <Spacing size={3.4} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            text-align: center;

            span {
              ${DESIGN_TOKEN_TEXT.body16Medium};
              color: ${DESIGN_TOKEN_COLOR.gray600};
            }
          `}
        >
          <Typography>30일간 진행한 회고가 없어요!</Typography>
          <Typography>회고를 진행해 실행목표를 설정해보세요</Typography>
        </div>
        <Spacing size={3.4} />
        <Button
          colorSchema={"outline"}
          css={css`
            width: fit-content;
            padding: 0 2.1rem;
          `}
        >
          <Typography variant={"subtitle16SemiBold"} color={"gray800"}>
            회고 진행하러가기
          </Typography>
        </Button>
      </div>
    </div>
  );
}
