import { css } from "@emotion/react";
import { useAtom } from "jotai";

import { Typography } from "../../../typography";
import { useNavigation } from "../../context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Space } from "@/types/spaceType";
import { currentSpaceState } from "@/store/space/spaceAtom";

import spaceDefaultImg from "@/assets/imgs/space/spaceDefaultImg.png";
import { useLocation, useNavigate } from "react-router-dom";

interface SpaceItemProps {
  space: Space;
}

// 상태별 스타일 정의
const SPACE_ITEM_STYLES = {
  backgroundColor: {
    default: "transparent",
    currentInSpace: DESIGN_TOKEN_COLOR.gray100,
    currentInHome: "transparent",
  },
  hover: DESIGN_TOKEN_COLOR.gray100,
};

export default function SpaceItem({ space }: SpaceItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed } = useNavigation();
  const { id: spaceId, name, introduction, bannerUrl } = space;

  const [currentSpace, setCurrentSpace] = useAtom(currentSpaceState);

  const isHome = location.pathname === "/";
  const isCurrent = String(currentSpace?.id) === String(spaceId);

  const getBackgroundColor = () => {
    if (isCurrent) {
      return SPACE_ITEM_STYLES.backgroundColor.currentInSpace;
    }

    if (isHome) {
      return SPACE_ITEM_STYLES.backgroundColor.currentInHome;
    }

    return SPACE_ITEM_STYLES.backgroundColor.default;
  };

  const handleSelectSpace = () => {
    setCurrentSpace(space);
    navigate(`/retrospectSpace/${spaceId}`);
  };

  return (
    <li
      css={css`
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        background-color: ${getBackgroundColor()};
        border-radius: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        ${isCollapsed
          ? css`
              justify-content: center;
              height: 4.8rem;
              padding: 0;
            `
          : css`
              justify-content: flex-start;
              height: 5.6rem;
              padding: 0.7rem 0.4rem;
            `}

        &:hover {
          background-color: ${SPACE_ITEM_STYLES.hover};
        }
      `}
      onClick={handleSelectSpace}
    >
      {/* ---------- 스페이스 이미지/아이콘 ---------- */}
      <div
        css={css`
          width: 3.6rem;
          height: 3.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          border-radius: 50%;
        `}
      >
        <img
          src={bannerUrl}
          alt={`${name}Image`}
          onError={(e) => {
            e.currentTarget.src = spaceDefaultImg;
          }}
          css={css`
            width: 3.6rem;
            height: 3.6rem;
            border-radius: 100%;
            object-fit: cover;
          `}
        />
      </div>

      {/* ---------- 스페이스 이름/설명 ---------- */}
      <div
        css={css`
          flex-direction: column;
          gap: 0.2rem;
          flex: 0.9;
          min-width: 0;
          transition: opacity 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                display: none;
                opacity: 0;
                visibility: hidden;
                width: 0;
              `
            : css`
                display: flex;
                opacity: 1;
                visibility: visible;
                width: auto;
              `}
        `}
      >
        <Typography
          variant="subtitle14SemiBold"
          color="gray900"
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          {name}
        </Typography>
        <Typography
          variant="body12Medium"
          color="gray600"
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          {introduction}
        </Typography>
      </div>
    </li>
  );
}
