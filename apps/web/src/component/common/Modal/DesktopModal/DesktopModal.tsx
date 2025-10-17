import { css } from "@emotion/react";

import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation";
import { Button, ButtonProvider } from "../../button";
import { Icon } from "../../Icon";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { ModalType } from "@/types/modal";
import { Typography } from "../../typography";

type DesktopModalHeaderProps = {
  title: string;
  onClose: () => void;
  options?: ModalType["options"];
};

type DesktopModalFooterProps = {
  onConfirm?: () => void;
  options?: ModalType["options"];
};

export default function DesktopModal() {
  const { modalDataState, close } = useDesktopBasicModal();

  const { title, contents, onConfirm, onClose, options } = modalDataState;

  if (!modalDataState.isOpen) return null;

  const closeDesktopModal = () => {
    if (!options?.disabledClose) {
      close();
    }

    onClose?.();
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
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10001;
          background-color: rgba(0, 0, 0, 0.5);
        `}
      >
        <div
          css={css`
            width: 52rem;
            height: 65.2rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background-color: #fff;
            border-radius: 2rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            padding: 2.4rem 0;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DesktopModalHeader title={title} onClose={closeDesktopModal} options={options} />
          <div
            css={css`
              flex: 1;
              overflow-y: auto;
              padding: 2rem 2.4rem 0rem 2.4rem;
            `}
          >
            {contents}
          </div>
          <DesktopModalFooter onConfirm={onConfirm} options={options} />
        </div>
      </div>
    </Portal>
  );
}

function DesktopModalHeader({ title, onClose, options }: DesktopModalHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2.4rem;
      `}
    >
      {options?.needsBackButton && (
        <button
          onClick={options?.backButtonCallback}
          css={css`
            display: flex;
            align-items: center;
            cursor: pointer;
          `}
        >
          <Icon
            icon={"ic_arrow_back_white"}
            size={2.4}
            css={css`
              path {
                fill: #212329;
                transition: 0.4s all;
              }
            `}
          />
        </button>
      )}

      <div
        css={css`
          flex: 1;
          margin: ${options?.needsBackButton ? "0 0.5rem 0 1.2rem" : "0 0.5rem 0 0"};
        `}
      >
        <Typography variant="title22Bold" color="gray900">
          {title}
        </Typography>
      </div>

      <button
        onClick={onClose}
        css={css`
          display: flex;
          align-items: center;
          cursor: pointer;
        `}
      >
        <Icon
          icon={"ic_quit"}
          size={2.4}
          css={css`
            path {
              fill: #212329;
              transition: 0.4s all;
            }
          `}
          onClick={onClose}
        />
      </button>
    </div>
  );
}

function DesktopModalFooter({ onConfirm = () => {}, options = {} }: DesktopModalFooterProps) {
  const DEFAULT_BUTTON_TEXT = ["취소", "확인"];

  if (!options.enableFooter) return null;

  return (
    <div
      css={css`
        width: 100%;
        align-content: flex-end;
        padding: 0 2.4rem;
      `}
    >
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
          div:nth-of-type(1) {
            display: none;
          }
        `}
      >
        {options.footerLeftCallback && (
          <Button colorSchema={"gray"} onClick={options.footerLeftCallback}>
            {options?.buttonText?.[0] ?? DEFAULT_BUTTON_TEXT[0]}
          </Button>
        )}
        <Button colorSchema={"primary"} onClick={onConfirm}>
          {options?.buttonText?.[1] ?? DEFAULT_BUTTON_TEXT[1]}
        </Button>
      </ButtonProvider>
    </div>
  );
}
