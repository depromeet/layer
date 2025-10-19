import { css } from "@emotion/react";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Typography } from "../typography";
import { useFunnelModal } from "@/hooks/useFunnelModal";

export type DesktopModalHeaderProps = {
  title: string;
  tag?: string;
  onBack?: () => void;
  onClose: () => void;
};

export default function DesktopFunnelModalHeader({ title, tag, onBack, onClose }: DesktopModalHeaderProps) {
  const { funnelModalState } = useFunnelModal();
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
        background-color: ${funnelModalState.step === "retrospectWrite" ? DESIGN_TOKEN_COLOR.gray900 : "#fff"};
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
            size={2.4}
          />
        </button>
      )}
      <div
        css={css`
          display: flex;
          flex: 1;
          align-items: center;
          margin-left: ${onBack && "1.2rem"};
        `}
      >
        <Typography variant="title22Bold">{title}</Typography>
        {onBack && (
          <span
            css={css`
              display: inline-block;
              font-size: 1.2rem;
              font-weight: 600;
              line-height: 140%;
              padding: 0.4rem 0.8rem;
              background-color: ${DESIGN_TOKEN_COLOR.blue600};
              border-radius: 0.4rem;
              color: #fff;
              margin-left: 1.2rem;
            `}
          >
            {tag}
          </span>
        )}
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
            background-color: ${funnelModalState.step !== "retrospectWrite" && DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon
          icon={"ic_quit"}
          css={css`
            color: ${funnelModalState.step === "retrospectWrite" ? "#fff" : "#212329"};
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
