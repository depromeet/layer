import { css } from "@emotion/react";

import { Icon } from "../Icon";
import { Typography } from "../typography";
import Tooltip from "../Tooltip";
import ChannelTalkWrapper from "../ChannelTalkWrapper";
import { useNavigation } from "./context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { forwardRef } from "react";

type HelpButtonProps = {
  isCollapsed: boolean;
};

const HelpButton = forwardRef<HTMLButtonElement, HelpButtonProps>(({ isCollapsed, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.6rem;
        padding: 0 0.4rem;
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

        &:focus,
        &:hover {
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        }
      `}
    >
      <Icon icon="ic_help" size={1.8} />
      {!isCollapsed && (
        <Typography
          variant="body12Medium"
          color="gray700"
          css={css`
            overflow: hidden;
            white-space: nowrap;
            transition: opacity 0.3s ease-in-out;
          `}
        >
          헬프 센터
        </Typography>
      )}
    </button>
  );
});

export default function HelpCenter() {
  const { isCollapsed } = useNavigation();

  return (
    <ChannelTalkWrapper
      css={css`
        width: ${isCollapsed ? "auto" : "10.6rem"};
      `}
    >
      {isCollapsed ? (
        <Tooltip placement="right">
          <Tooltip.Trigger>
            <HelpButton isCollapsed={true} />
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography variant="body12Medium" color="gray00">
              헬프 센터
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      ) : (
        <HelpButton isCollapsed={false} />
      )}
    </ChannelTalkWrapper>
  );
}
