import { css } from "@emotion/react";

import { Icon } from "../../Icon";
import { Typography } from "../../typography";
import { useNavigation } from "../context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function HomeButton() {
  const { isCollapsed } = useNavigation();

  return (
    <button
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: ${isCollapsed ? "center" : "flex-start"};
          align-items: center;
          width: ${isCollapsed ? "3.2rem" : "100%"};
          height: ${isCollapsed ? "3.2rem" : "3.9rem"};
          gap: 1.6rem;
          padding: ${isCollapsed ? "0.4rem" : "0.4rem 0.8rem"};
          background-color: "transparent";
          border-radius: 0.8rem;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_home" size={1.4} />

        <Typography
          variant="subtitle16SemiBold"
          color="gray900"
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
          홈
        </Typography>
      </div>
      <hr
        css={css`
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          width: 100%;
          border: none;
          height: 1px;
          padding-left: 1.2rem;
          padding-right: 1.2rem;
          margin: ${isCollapsed ? "1.2rem 0.4rem" : "0.8rem 0.4rem"};
        `}
      />
    </button>
  );
}
