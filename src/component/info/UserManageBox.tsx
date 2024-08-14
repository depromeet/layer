import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { InfoBox } from "./InfoBox";

import { MidModal } from "@/component/common/Modal/MidModal";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { usePostSignOut } from "@/hooks/api/login/usePostSignOut";
import { useDeleteUser } from "@/hooks/api/user/useDeleteUser";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type LocationState = {
  showDeletionModal?: boolean;
};

export function UserManageBox() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: signOut } = usePostSignOut();
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
  const memberId = Cookies.get("memberId");

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.showDeletionModal) {
      setIsDeletionModalVisible(true);
    }
  }, [location.state]);

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
              navigate(PATHS.userDeletion());
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

      {isDeletionModalVisible && (
        <MidModal
          title="계정탈퇴"
          content={`계정 탈퇴시 모든 회고 정보가 날아가요.\n정말 계정 탈퇴를 진행하시겠어요?`}
          leftFun={() => {
            setIsDeletionModalVisible(false);
          }}
          rightFun={() => {
            if (memberId) {
              deleteUser(memberId);
            }
          }}
        />
      )}
    </>
  );
}
