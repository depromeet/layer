import loginLogo from "@/assets/imgs/loginLogo.svg";
import { loginType } from "@/types/loginType";

const LoginSpriteSvg = ({ type }: loginType) => (
  <svg width="1.8rem" height="1.833rem">
    <use href={`${loginLogo}#${type}`} />
  </svg>
);

export default LoginSpriteSvg;
