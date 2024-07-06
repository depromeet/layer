import { css } from "@emotion/react";
import { loginBtnType } from "@/types/loginType";
import LoginSpriteSvg from "../Img/LoginSpriteSvg";

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
        height: 4.8rem;
        border-radius: 0.8rem;
        background-color: ${backgroundColors[type]};
        text-align: center;
        position: relative;
        border: ${type === "google" ? "0.01rem solid rgba(0, 0, 0, 0.08)" : "none"};
      `}
      onClick={() => {
        handler();
      }}
    >
      <div
        css={css`
          position: absolute;
          left: 1.6rem;
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
