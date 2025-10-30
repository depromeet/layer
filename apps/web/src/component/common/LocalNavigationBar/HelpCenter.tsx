import { css } from "@emotion/react";

import { Icon } from "../Icon";
import { Typography } from "../typography";
import Tooltip from "../Tooltip";
import ChannelTalkWrapper from "../ChannelTalkWrapper";
import { useNavigation } from "./context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

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

                width: 3.2rem;
                height: 3.2rem;

                &:focus {
                  background-color: ${DESIGN_TOKEN_COLOR.gray100};
                }

                &:hover {
                  background-color: ${DESIGN_TOKEN_COLOR.gray100};
                }
              `}
            >
              <Icon icon="ic_help" size={1.8} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography variant="body12Medium" color="gray00">
              헬프 센터
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      ) : (
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

            width: 100%;
            height: 3.6rem;

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
      )}
    </ChannelTalkWrapper>
  );
}
