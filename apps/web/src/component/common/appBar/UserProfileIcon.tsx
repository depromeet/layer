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
      alt="사용자 프로필"
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
