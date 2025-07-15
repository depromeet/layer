import { css } from "@emotion/react";

import { Icon } from "../Icon";
import { Typography } from "../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function LocalNavigationBarFooter() {
  return (
    <footer
      css={css`
        border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        padding: 0.6rem 2rem;
        display: flex;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 9.8rem;
          height: 3.6rem;
          gap: 1.2rem;
          padding: 0rem 0.4rem;
        `}
      >
        <Icon icon="basicProfile" size={2.4} />
        <Typography variant="body12Medium" color="gray700">
          {"홍길동"}
        </Typography>
      </div>
      <div
        css={css`
          width: 0.1rem;
          height: 1.8rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          margin: 0 0.8rem;
        `}
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 3.6rem;
          gap: 0.6rem;
          padding: 0rem 1.6rem;
        `}
      >
        <Icon icon="ic_help" size={1.8} />
        <Typography variant="body12Medium" color="gray700">
          헬프 센터
        </Typography>
      </div>
    </footer>
  );
}
