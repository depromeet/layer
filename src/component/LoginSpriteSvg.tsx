import loginLogo from "@/assets/imgs/loginLogo.svg";
import { loginType } from "@/types/loginType";

const LoginSpriteSvg = ({ type }: loginType) => (
  <svg width="18px" height="18.33px">
    <use href={`${loginLogo}#${type}`} />
  </svg>
);

export default LoginSpriteSvg;
