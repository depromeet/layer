import { lazy, useRef, useState } from "react";
import { css } from "@emotion/react";
import { UserProfileDropdown } from "./UserProfileDropdown";
import { useNavigation } from "./context/NavigationContext";
import Tooltip from "../Tooltip";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Icon } from "../Icon";
import { Typography } from "../typography";
import { usePostSignOut } from "@/hooks/api/login/usePostSignOut";
import Cookies from "js-cookie";
import { useAtomValue } from "jotai";
import { authAtom } from "@/store/auth/authAtom";
import useClickOutside from "@/hooks/useClickOutside";

const LogoutModal = lazy(() => import("../Modal/UserSetting/LogoutModal").then((module) => ({ default: module.LogoutModal })));
const FeedbackModal = lazy(() => import("../Modal/UserSetting/FeedbackModal").then((module) => ({ default: module.FeedbackModal })));
const AccountSettingsModal = lazy(() =>
  import("../Modal/UserSetting/AccountSettingsModal").then((module) => ({ default: module.AccountSettingsModal })),
);

export default function UserProfile() {
  const { isCollapsed } = useNavigation();
  const { mutate: signOut } = usePostSignOut();
  const { name, imageUrl } = useAtomValue(authAtom);

  const memberId = Cookies.get("memberId");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleAccountSettingsClose = () => {
    setIsAccountSettingsModalOpen(false);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleAccountSettings = () => {
    setIsAccountSettingsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleFeedback = () => {
    setIsFeedbackModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleHelp = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsDropdownOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <>
      <div
        css={css`
          position: relative;
          width: ${isCollapsed ? "auto" : "9.8rem"};
        `}
      >
        <UserProfileDropdown
          ref={dropdownRef}
          isOpen={isDropdownOpen}
          onAccountSettings={handleAccountSettings}
          onFeedback={handleFeedback}
          onHelp={handleHelp}
          onLogout={handleLogout}
        />

        {isCollapsed ? (
          <Tooltip placement="right">
            <Tooltip.Trigger>
              <button
                ref={buttonRef}
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 1.2rem;
                  border: none;
                  padding: 0rem 0.4rem;
                  background: transparent;
                  border-radius: 0.8rem;
                  cursor: pointer;
                  transition:
                    background-color 0.2s ease-in-out,
                    width 0.3s ease-in-out,
                    height 0.3s ease-in-out;

                  width: auto;
                  height: 3.2rem;

                  &:focus {
                    background-color: ${DESIGN_TOKEN_COLOR.gray100};
                  }

                  &:hover {
                    background-color: ${DESIGN_TOKEN_COLOR.gray100};
                  }

                  ${isDropdownOpen &&
                  css`
                    background-color: ${DESIGN_TOKEN_COLOR.gray100};
                  `}
                `}
                onClick={handleProfileClick}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    css={css`
                      width: 2.4rem;
                      height: 2.4rem;
                      border-radius: 100%;
                      object-fit: cover;
                    `}
                  />
                ) : (
                  <Icon icon="basicProfile" size={2.4} />
                )}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Typography variant="body12Strong" color="gray00">
                {name}
              </Typography>
            </Tooltip.Content>
          </Tooltip>
        ) : (
          <button
            ref={buttonRef}
            css={css`
              display: flex;
              align-items: center;
              gap: 1.2rem;
              border: none;
              padding: 0rem 0.4rem;
              background: transparent;
              border-radius: 0.8rem;
              cursor: pointer;
              transition:
                background-color 0.2s ease-in-out,
                width 0.3s ease-in-out,
                height 0.3s ease-in-out;

              width: 100%;
              height: 3.6rem;

              &:focus {
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
              }

              &:hover {
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
              }

              ${isDropdownOpen &&
              css`
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
              `}
            `}
            onClick={handleProfileClick}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                css={css`
                  width: 2.4rem;
                  height: 2.4rem;
                  border-radius: 100%;
                  object-fit: cover;
                `}
              />
            ) : (
              <Icon icon="basicProfile" size={2.4} />
            )}

            <Typography
              variant="body12Medium"
              color="gray700"
              css={css`
                overflow: hidden;
                white-space: nowrap;
                transition: opacity 0.3s ease-in-out;
                display: block;
                width: auto;
                opacity: 1;
                visibility: visible;
              `}
            >
              {name}
            </Typography>
          </button>
        )}
      </div>

      {/* ---------- 평가 및 피드백 모달 ---------- */}
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />

      {/* ---------- 계정설정 모달 ---------- */}
      <AccountSettingsModal isOpen={isAccountSettingsModalOpen} onClose={handleAccountSettingsClose} />

      {/* ---------- 로그아웃 모달 ---------- */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          if (memberId) {
            signOut({ memberId: memberId });
          }
          setIsLogoutModalOpen(false);
        }}
      />
    </>
  );
}
