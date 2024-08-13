import { css } from "@emotion/react";

import { InfoBox } from "./InfoBox";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function ServicePolicyBox() {
  return (
    <div
      css={css`
        width: 100%;
        height: auto;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        box-shadow: 0rem 0.4rem 1.2rem 0rem #06080c0a;
        padding: 2rem;
        padding-right: 2.2rem;
        padding-bottom: 1.2rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <Typography
        variant="subtitle14SemiBold"
        color="gray600"
        css={css`
          margin-bottom: 0.8rem;
        `}
      >
        운영방침
      </Typography>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <InfoBox
          content="오픈 소스 라이센스"
          onClick={() => {
            console.log("오픈 소스 라이센스");
          }}
        />
        <InfoBox
          content="이용약관"
          onClick={() => {
            console.log("이용약관");
          }}
        />
        <InfoBox
          content="개인정보 처리방침"
          onClick={() => {
            console.log("개인정보 처리방침");
          }}
        />
      </div>
    </div>
  );
}
