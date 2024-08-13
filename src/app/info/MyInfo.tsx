import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { UserBox, VersionBox, ServicePolicyBox, UserManageBox } from "@/component/info";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { authAtom } from "@/store/auth/authAtom";

export function MyInfo() {
  const [{ name, imageUrl }] = useAtom(authAtom);
  return (
    <DefaultLayout theme="gray" title="내 정보">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        <UserBox name={name} imgUrl={imageUrl} />
        <VersionBox />
        <ServicePolicyBox />
        <UserManageBox />
      </div>
    </DefaultLayout>
  );
}
