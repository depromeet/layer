import { css } from "@emotion/react";

import { Title } from "@/component/common/header/Title";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export type DesktopModalHeaderProps = {
  title: string;
  onBack?: () => void;
  onClose: () => void;
};

export default function DesktopFunnelModalHeader({ title, onBack, onClose }: DesktopModalHeaderProps) {
  return (
    <header
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
          padding: 0.4rem;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          border-radius: 0.4rem;
          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
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
    </header>
  );
}
