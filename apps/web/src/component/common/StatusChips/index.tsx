import { DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export default function Index({ children }: { children: ReactNode }) {
  return (
    // TODO: 디자인 팀에 새로운 배경 컬러에 따른 디자인 토큰 요청하기
    <div
      css={css`
        ${DESIGN_TOKEN_TEXT.body12SemiBold}
        color: #73a2ff;
        background: #f0f4ff;
        padding: 0.35rem 0.6rem;
        border-radius: 0.4rem;
        width: fit-content;
      `}
    >
      {children}
    </div>
  );
}
