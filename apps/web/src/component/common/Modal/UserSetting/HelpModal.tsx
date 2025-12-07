import { css } from "@emotion/react";
import { useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ANIMATION } from "@/style/common/animation";
import { info } from "@/config/info";

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ContentConfig = { type: "simple"; content: string } | { type: "list"; items: Array<{ title: string; content: string }> };

type MenuItem = {
  label: string;
  value?: string;
  showChevron?: boolean;
  contentConfig?: ContentConfig;
};

const MENU_ITEMS: (MenuItem | "divider")[] = [
  { label: "현재 버전", value: "1.0.2" },
  "divider",
  { label: "공지사항", showChevron: true, contentConfig: { type: "list", items: info.notices } },
  { label: "도움말", showChevron: true, contentConfig: { type: "list", items: info.help } },
  "divider",
  { label: "오픈 소스 라이센스", showChevron: true, contentConfig: { type: "simple", content: info.license } },
  { label: "이용약관", showChevron: true, contentConfig: { type: "simple", content: info.termsOfService } },
  { label: "개인정보 처리방침", showChevron: true, contentConfig: { type: "simple", content: info.privacyPolicy } },
];

type MenuItemRowProps = MenuItem & {
  onClick?: () => void;
};

function MenuItemRow({ label, value, showChevron, onClick }: MenuItemRowProps) {
  const isClickable = onClick !== undefined;

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.7rem 0;
        ${isClickable &&
        css`
          cursor: pointer;
          transition: background-color 0.2s ease;
        `}
      `}
      onClick={onClick}
    >
      <Typography variant="body16Medium" color="black">
        {label}
      </Typography>
      {value ? (
        <Typography variant="body16Medium" color="gray600">
          {value}
        </Typography>
      ) : showChevron ? (
        <Icon icon="ic_next_chevron" size={1.6} color={DESIGN_TOKEN_COLOR.gray900} />
      ) : null}
    </div>
  );
}

function Divider() {
  return (
    <div
      css={css`
        border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        padding: 0.4rem 0;
      `}
    />
  );
}

type ViewState =
  | {
      type: "menu";
    }
  | {
      type: "detail";
      title: string;
      contentConfig: ContentConfig;
    }
  | {
      type: "listDetail";
      title: string;
      contentConfig: ContentConfig & { type: "list" };
      selectedIndex: number | null;
    };

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [viewState, setViewState] = useState<ViewState>({ type: "menu" });

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (!item.contentConfig) return;

    if (item.contentConfig.type === "list") {
      setViewState({ type: "listDetail", title: item.label, contentConfig: item.contentConfig, selectedIndex: null });
    } else {
      setViewState({ type: "detail", title: item.label, contentConfig: item.contentConfig });
    }
  };

  const handleBackClick = () => {
    if (viewState.type === "listDetail") {
      if (viewState.selectedIndex !== null) {
        // 리스트 아이템이 선택된 상태면 리스트로 돌아가기
        setViewState({ ...viewState, selectedIndex: null });
      } else {
        // 리스트 화면이면 메인 메뉴로 돌아가기
        setViewState({ type: "menu" });
      }
    } else if (viewState.type === "detail") {
      setViewState({ type: "menu" });
    }
  };

  const handleListItemClick = (index: number) => {
    if (viewState.type === "listDetail") {
      setViewState({ ...viewState, selectedIndex: index });
    }
  };

  const renderHeader = () => {
    const showBackButton = viewState.type !== "menu";

    return (
      <header
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.4rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 1.2rem;
            flex: 1;
          `}
        >
          {showBackButton && (
            <button
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3.2rem;
                height: 3.2rem;
                border: none;
                background: transparent;
                border-radius: 0.4rem;
                cursor: pointer;
                transition: background-color 0.2s ease;
              `}
              onClick={handleBackClick}
            >
              <Icon icon="ic_arrow_left" size={2.4} color={DESIGN_TOKEN_COLOR.gray900} />
            </button>
          )}
          <Typography variant="subtitle18SemiBold" color="gray900">
            {viewState.type === "menu" ? "도움말" : viewState.title}
          </Typography>
        </div>
        <button
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.2rem;
            height: 3.2rem;
            border: none;
            background: transparent;
            border-radius: 0.4rem;
            cursor: pointer;
            transition: background-color 0.2s ease;
          `}
          onClick={onClose}
        >
          <Icon icon="ic_close" size={2.4} color={DESIGN_TOKEN_COLOR.gray900} />
        </button>
      </header>
    );
  };

  const renderContent = () => {
    if (viewState.type === "menu") {
      return (
        <div
          css={css`
            padding: 0 2.4rem 2.4rem 2.4rem;
            display: flex;
            flex-direction: column;
          `}
        >
          {MENU_ITEMS.map((item, index) =>
            item === "divider" ? (
              <Divider key={`divider-${index}`} />
            ) : (
              <MenuItemRow key={item.label} {...item} onClick={item.contentConfig ? () => handleMenuItemClick(item) : undefined} />
            ),
          )}
        </div>
      );
    }

    if (viewState.type === "listDetail") {
      const isListItemSelected = viewState.selectedIndex !== null;
      const selectedItem = isListItemSelected && viewState.selectedIndex !== null ? viewState.contentConfig.items[viewState.selectedIndex] : null;

      return (
        <div
          css={css`
            padding: 0 2.4rem 2.4rem 2.4rem;
            display: flex;
            flex-direction: column;
          `}
        >
          {!isListItemSelected ? (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
              `}
            >
              {viewState.contentConfig.items.map((item, index) => (
                <div
                  key={index}
                  css={css`
                    padding: 1.6rem 0;
                    background-color: ${DESIGN_TOKEN_COLOR.gray00};
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                  `}
                  onClick={() => handleListItemClick(index)}
                >
                  <Typography variant="body16Medium" color="gray900">
                    {item.title}
                  </Typography>
                </div>
              ))}
            </div>
          ) : selectedItem ? (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 1.6rem;
              `}
            >
              <Typography variant="subtitle16SemiBold" color="gray900">
                {selectedItem.title}
              </Typography>
              <Typography
                variant="body16Medium"
                color="gray800"
                css={css`
                  white-space: pre-wrap;
                  word-wrap: break-word;
                  overflow-wrap: break-word;
                `}
              >
                {selectedItem.content}
              </Typography>
            </div>
          ) : null}
        </div>
      );
    }

    if (viewState.type === "detail") {
      const content = viewState.contentConfig.type === "simple" ? viewState.contentConfig.content : "";

      return (
        <div
          css={css`
            padding: 0 2.4rem 2.4rem 2.4rem;
            display: flex;
            flex-direction: column;
          `}
        >
          <Typography
            variant="body16Medium"
            color="gray800"
            css={css`
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow-wrap: break-word;
            `}
          >
            {content}
          </Typography>
        </div>
      );
    }

    return null;
  };

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(6, 8, 12, 0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
        `}
        onClick={handleBackgroundClick}
      >
        <div
          css={css`
            width: 100%;
            max-width: 52rem;
            height: 60vh;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            border-radius: 1.2rem;
            box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            margin: 2rem;
            animation: ${ANIMATION.FADE_IN} 0.3s ease-out;
            overflow: hidden;
          `}
        >
          {renderHeader()}
          <div
            css={css`
              flex: 1;
              overflow-y: auto;
              min-height: 0;
            `}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </Portal>
  );
}
