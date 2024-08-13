import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { useState } from "react";

import { InfoBox } from "./InfoBox";

import { MidModal } from "@/component/common/Modal/MidModal";
import { Typography } from "@/component/common/typography";
import { usePostSignOut } from "@/hooks/api/login/usePostSignOut";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function UserManageBox() {
  const { mutate: signOut } = usePostSignOut();
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const memberId = Cookies.get("memberId");

  return (
    <>
      <div
        css={css`
          width: 100%;
          height: auto;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 1.2rem;
          box-shadow: 0rem 0.4rem 1.2rem 0rem #06080c0a;
          padding: 2rem;
          padding-right: 2.2rem;
          padding-bottom: 1.2rem;
          display: flex;
          flex-direction: column;
        `}
      >
        <Typography
          variant="subtitle14SemiBold"
          color="gray600"
          css={css`
            margin-bottom: 0.8rem;
          `}
        >
          운영방침
        </Typography>
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          <InfoBox
            content="계정탈퇴"
            onClick={() => {
              console.log("계정탈퇴 실행");
            }}
          />
          <div
            css={css`
              width: 100%;
              height: 4.8rem;
              display: flex;
              align-items: center;
            `}
            onClick={() => {
              setIsSignOutModalVisible(true);
            }}
          >
            <Typography variant="body16Medium">로그아웃</Typography>
          </div>
        </div>
      </div>
      {isSignOutModalVisible && (
        <MidModal
          title="로그아웃"
          content="정말 로그아웃 하시겠어요?"
          leftFun={() => {
            setIsSignOutModalVisible(false);
          }}
          rightFun={() => {
            if (memberId) signOut({ memberId: memberId });
          }}
        />
      )}
    </>
  );
}
