import loginLogo from "@/assets/svgs/spriteSvgs/loginLogo.svg";
import { loginType } from "@/types/loginType";

export function LoginSpriteSvg({ type }: loginType) {
  return (
    <svg width="1.8rem" height="1.833rem">
      <use href={`${loginLogo}#${type}`} />
    </svg>
  );
}
