import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { PATHS } from "@layer/shared";
import { authAtom } from "@/store/auth/authAtom.tsx";

export function UserProfileIcon() {
  const [{ imageUrl }] = useAtom(authAtom);
  const navigate = useNavigate();
  const handleClick = () => navigate(PATHS.myInfo());

  return imageUrl ? (
    <img
      src={imageUrl}
      alt="내 프로필"
      width={32}
      height={32}
      loading="eager"
      decoding="async"
      css={css`
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 100%;
        cursor: pointer;
        object-fit: cover;
      `}
      onClick={handleClick}
    />
  ) : (
    <Icon
      icon="basicProfile"
      size="3.2rem"
      onClick={handleClick}
      css={css`
        cursor: pointer;
      `}
    />
  );
}
