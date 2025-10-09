import { css } from "@emotion/react";

import { Portal } from "@/component/common/Portal";
import { useModal } from "@/hooks/useModal";
import { ANIMATION } from "@/style/common/animation";
import { Button, ButtonProvider } from "../../button";
import { Icon } from "../../Icon";
import { Title } from "../../header/Title";

type DesktopModalHeaderProps = {
  title: string;
  onBack?: () => void;
  onClose: () => void;
};

type DesktopModalFooterProps = {
  leftText?: string;
  rightText?: string;
  leftFunction?: () => void;
  rightFunction?: () => void;
};

export default function DesktopModal() {
  const { modalDataState, close } = useModal();

  const { title, contents, onConfirm } = modalDataState;

  if (!modalDataState.isOpen) return null;

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
          z-index: 10000;
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
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            padding: 2rem;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DesktopModalHeader title={title} onBack={close} onClose={close} />
          <div
            css={css`
              flex: 1;
              overflow-y: auto;
              padding: 2rem 0;
            `}
          >
            {contents}
          </div>
          <DesktopModalFooter rightFunction={onConfirm} />
        </div>
      </div>
    </Portal>
  );
}

function DesktopModalHeader({ title, onBack, onClose }: DesktopModalHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      {onBack ? (
        <button
          onClick={onBack}
          css={css`
            display: flex;
            align-items: center;
            cursor: pointer;
          `}
        >
          <Icon
            icon={"ic_arrow_back_white"}
            css={css`
              path {
                fill: #212329;
                transition: 0.4s all;
              }
            `}
            onClick={onBack}
          />
        </button>
      ) : (
        <div
          css={css`
            width: 1.5rem;
          `}
        />
      )}

      <div
        css={css`
          flex: 1;
          margin: 0 0.5rem;
        `}
      >
        <Title type="modal" contents={title} />
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

function DesktopModalFooter({ leftText = "취소", rightText = "확인", leftFunction, rightFunction = () => {} }: DesktopModalFooterProps) {
  return (
    <div
      css={css`
        width: 100%;
        align-content: flex-end;
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
        {leftFunction && (
          <Button colorSchema={"gray"} onClick={leftFunction}>
            {leftText}
          </Button>
        )}
        <Button colorSchema={"primary"} onClick={rightFunction}>
          {rightText}
        </Button>
      </ButtonProvider>
    </div>
  );
}
