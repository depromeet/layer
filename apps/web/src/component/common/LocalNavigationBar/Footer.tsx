import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

import { Icon } from "../Icon";
import { Typography } from "../typography";
import { AcountSettingsModal } from "../Modal/UserSetting/AcountSettingsModal";
import { FeedbackModal } from "../Modal/UserSetting/FeedbackModal";
import { LogoutModal } from "../Modal/UserSetting/LogoutModal";
import { useNavigation } from "./context/NavigationContext";
import { UserProfileDropdown } from "./UserProfileDropdown";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useAtom } from "jotai";
import { authAtom } from "@/store/auth/authAtom";
import { usePostSignOut } from "@/hooks/api/login/usePostSignOut";

export default function Footer() {
  const { isCollapsed } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [{ name, imageUrl }] = useAtom(authAtom);
  const { mutate: signOut } = usePostSignOut();
  const memberId = Cookies.get("memberId");

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAccountSettings = () => {
    setIsAccountSettingsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAccountSettingsClose = () => {
    setIsAccountSettingsModalOpen(false);
  };

  const handleFeedback = () => {
    setIsFeedbackModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleHelp = () => {
    // 도움말 로직
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <footer
      css={css`
        border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        display: flex;
        align-items: center;
        gap: 0.8rem;
        position: relative;
        transition:
          padding 0.3s ease-in-out,
          gap 0.3s ease-in-out;

        ${isCollapsed
          ? css`
              padding: 0.4rem 2rem 1.2rem 2rem;
              flex-direction: column-reverse;
            `
          : css`
              padding: 0.6rem 2rem;
              flex-direction: row;
            `}
      `}
    >
      {/* ---------- 프로필 이미지/이름 ---------- */}
      <div
        css={css`
          position: relative;
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

        <button
          ref={buttonRef}
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.2rem;
            padding: 0rem 0.4rem;
            border: none;
            background: transparent;
            border-radius: 0.8rem;
            cursor: pointer;
            transition:
              background-color 0.2s ease-in-out,
              width 0.3s ease-in-out,
              height 0.3s ease-in-out;

            ${isCollapsed
              ? css`
                  width: auto;
                  height: 3.2rem;
                `
              : css`
                  width: 100%;
                  height: 3.6rem;
                `}

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

              ${isCollapsed
                ? css`
                    display: none;
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                  `
                : css`
                    display: block;
                    width: auto;
                    opacity: 1;
                    visibility: visible;
                  `}
            `}
          >
            {name}
          </Typography>
        </button>
      </div>

      {/* ---------- 구분선 ---------- */}
      {!isCollapsed && (
        <div
          css={css`
            width: 0.1rem;
            height: 1.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray200};
            margin: 0 0.8rem;
          `}
        />
      )}

      {/* ---------- 헬프 센터 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
          padding: 0rem 0.4rem;
          border: none;
          background: transparent;
          border-radius: 0.8rem;
          cursor: pointer;
          transition:
            background-color 0.2s ease-in-out,
            width 0.3s ease-in-out,
            height 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                width: 3.2rem;
                height: 3.2rem;
              `
            : css`
                width: 100%;
                height: 3.6rem;
              `}

          &:focus {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_help" size={1.8} />

        <Typography
          variant="body12Medium"
          color="gray700"
          css={css`
            overflow: hidden;
            white-space: nowrap;
            transition: opacity 0.3s ease-in-out;

            ${isCollapsed
              ? css`
                  display: none;
                  width: 0;
                  opacity: 0;
                  visibility: hidden;
                `
              : css`
                  display: block;
                  width: auto;
                  opacity: 1;
                  visibility: visible;
                `}
          `}
        >
          헬프 센터
        </Typography>
      </button>

      {/* 계정설정 모달 */}
      <AcountSettingsModal isOpen={isAccountSettingsModalOpen} onClose={handleAccountSettingsClose} />

      {/* 평가 및 피드백 모달 */}
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />

      {/* 로그아웃 모달 */}
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
    </footer>
  );
}
