import { css } from "@emotion/react";
import { loginBtnType } from "@/types/loginType";
import LoginSpriteSvg from "./LoginSpriteSvg";

// FIXME : 버튼 색 수정 필요
const backgroundColors = {
  kakao: "#ffe400",
  google: "#FFFFFF",
};

const SocialLoginButton = ({ type, handler }: loginBtnType) => {
  return (
    <button
      css={css`
        width: 100%;
        height: 48px;
        border-radius: 8px;
        background-color: ${backgroundColors[type]};
        text-align: center;
        position: relative;
        border: ${type === "google" ? "1px solid rgba(0, 0, 0, 0.08)" : "none"};
      `}
      onClick={() => {
        handler();
      }}
    >
      <div
        css={css`
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
        `}
      >
        <LoginSpriteSvg type={type} />
      </div>
      {type === "kakao" ? "카카오로" : "구글"} 로그인
    </button>
  );
};

export default SocialLoginButton;
