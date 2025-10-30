import { css } from "@emotion/react";

import { useNavigation } from "./context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

import HelpCenter from "./HelpCenter";
import UserProfile from "./UserProfile";

export default function Footer() {
  const { isCollapsed } = useNavigation();

  return (
    <>
      <footer
        css={css`
          border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition:
            padding 0.3s ease-in-out,
            gap 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                padding: 0.4rem 2rem 1.2rem 2rem;
                flex-direction: column-reverse;
              `
            : css`
                padding: 0.6rem 2rem;
                flex-direction: row;
              `}
        `}
      >
        {/* ---------- 프로필 이미지/이름 ---------- */}
        <UserProfile />

        {/* ---------- 구분선 ---------- */}
        {!isCollapsed && (
          <div
            css={css`
              width: 0.1rem;
              height: 1.8rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray200};
              margin: 0 0.8rem;
            `}
          />
        )}

        {/* ---------- 헬프 센터 버튼 ---------- */}
        <HelpCenter />
      </footer>
    </>
  );
}
