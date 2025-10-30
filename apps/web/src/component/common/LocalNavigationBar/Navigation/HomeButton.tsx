import { css } from "@emotion/react";

import { Icon } from "../../Icon";
import { Typography } from "../../typography";

import { useNavigation } from "../context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { currentSpaceState } from "@/store/space/spaceAtom";
import Tooltip from "../../Tooltip";

export default function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isCollapsed } = useNavigation();

  const setCurrentSpace = useSetAtom(currentSpaceState);

  const handleHomeButtonClick = () => {
    setCurrentSpace(null);
    navigate("/");
  };

  return (
    <button
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
      onClick={handleHomeButtonClick}
    >
      <Tooltip placement="right">
        <Tooltip.Trigger asChild>
          <div
            css={css`
              display: flex;
              justify-content: ${isCollapsed ? "center" : "flex-start"};
              align-items: center;
              width: ${isCollapsed ? "3.2rem" : "100%"};
              height: ${isCollapsed ? "3.2rem" : "3.9rem"};
              gap: 1.6rem;
              padding: ${isCollapsed ? "0.4rem" : "0.4rem 0.8rem"};
              background-color: ${location.pathname === "/" ? DESIGN_TOKEN_COLOR.gray100 : "transparent"};
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
        </Tooltip.Trigger>
        <Tooltip.Content>홈으로 이동</Tooltip.Content>
      </Tooltip>
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
