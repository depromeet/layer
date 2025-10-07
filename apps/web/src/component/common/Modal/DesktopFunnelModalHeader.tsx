import { css } from "@emotion/react";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Typography } from "../typography";

export type DesktopModalHeaderProps = {
  title: string;
  onBack?: () => void;
  onClose: () => void;
};

export default function DesktopFunnelModalHeader({ title, onBack, onClose }: DesktopModalHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 1001;
        padding-top: 2.4rem;
        background-color: #fff;
      `}
    >
      {onBack && (
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
      )}
      <div
        css={css`
          flex: 1;
          margin: 0 0.5rem;
        `}
      >
        <Typography variant="title22Bold">{title}</Typography>
      </div>

      <button
        onClick={onClose}
        css={css`
          display: flex;
          align-items: center;
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
          size={"2.4rem"}
        />
      </button>
    </div>
  );
}
