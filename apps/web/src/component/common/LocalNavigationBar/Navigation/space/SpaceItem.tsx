import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useEffect, forwardRef } from "react";

import { Typography } from "../../../typography";
import Tooltip from "../../../Tooltip";
import { useNavigation } from "../../context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Space } from "@/types/spaceType";
import { currentSpaceState } from "@/store/space/spaceAtom";

import spaceDefaultImg from "@/assets/imgs/space/spaceDefaultImg.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SpaceManageToggleMenu from "@/component/space/edit/SpaceManageToggleMenu";
import { isSpaceLeader } from "@/utils/userUtil";

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

type SpaceButtonProps = {
  space: Space;
  isCollapsed: boolean;
  backgroundColor: string;
  onClick: () => void;
  isLeader: boolean;
};

const SpaceButton = forwardRef<HTMLLIElement, SpaceButtonProps>(({ space, isCollapsed, backgroundColor, onClick, isLeader, ...props }, ref) => {
  const { id: spaceId, name, introduction, bannerUrl } = space;

  return (
    <li
      {...props}
      ref={ref}
      tabIndex={0}
      css={css`
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        background-color: ${backgroundColor};
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

              .space-manage-toggle-menu {
                visibility: hidden;
                opacity: 0;
                transition:
                  visibility 0.3s,
                  opacity 0.3s;
              }

              &:hover,
              &:focus-within {
                .space-manage-toggle-menu {
                  visibility: visible;
                  opacity: 1;
                }
              }
            `}

        &:hover {
          background-color: ${SPACE_ITEM_STYLES.hover};
        }
      `}
      onClick={onClick}
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

      {!isCollapsed && (
        <>
          {/* ---------- 스페이스 이름/설명 ---------- */}
          <div
            css={css`
              flex-direction: column;
              gap: 0.2rem;
              flex: 0.9;
              min-width: 0;
              transition: opacity 0.3s ease-in-out;
              display: flex;
              opacity: 1;
              visibility: visible;
              width: auto;
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

          <div
            css={css`
              margin-left: auto;
              min-width: 0;
              transition: opacity 0.3s ease-in-out;
              display: flex;
              opacity: 1;
              visibility: visible;
              width: auto;
            `}
          >
            {isLeader && <SpaceManageToggleMenu spaceId={spaceId} iconSize={1.8} iconColor="gray500" />}
          </div>
        </>
      )}
    </li>
  );
});

export default function SpaceItem({ space }: SpaceItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isCollapsed } = useNavigation();
  const { id: spaceId, name, leader, category } = space;
  const isLeader = isSpaceLeader(leader?.id);

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

  /**
   * 현재 URL과 상태를 동기화하는 효과
   * - URL의 spaceId와 현재 선택된 스페이스가 다를 때만 상태를 업데이트
   * - URL에 spaceId가 없으면 동기화하지 않음
   */
  useEffect(() => {
    const urlSpaceId = searchParams.get("spaceId") || location.pathname.match(/\/retrospectSpace\/(\d+)/)?.[1];

    // * URL에서 spaceId를 찾을 수 없으면 동기화 불필요
    if (!urlSpaceId) return;

    // * 현재 SpaceItem이 URL의 spaceId와 일치하는지 확인
    const isMatchingSpace = String(spaceId) === urlSpaceId;

    if (!isMatchingSpace) return;

    // * 현재 선택된 스페이스가 없거나 URL과 다른 경우에만 동기화
    const hasNoCurrentSpace = !currentSpace;
    const isDifferentSpace = currentSpace && String(currentSpace.id) !== urlSpaceId;
    const needsSync = hasNoCurrentSpace || isDifferentSpace;

    if (needsSync) {
      setCurrentSpace(space);
    }
  }, [location.pathname, searchParams, spaceId, space, currentSpace, setCurrentSpace]);

  return (
    <>
      {isCollapsed ? (
        <Tooltip placement="right">
          <Tooltip.Trigger>
            <SpaceButton space={space} isCollapsed={true} backgroundColor={getBackgroundColor()} onClick={handleSelectSpace} isLeader={isLeader} />
          </Tooltip.Trigger>
          <Tooltip.Content>
            <section
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.1rem;
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.2rem;
                `}
              >
                <Typography variant="caption10Medium" color="gray500">
                  {category === "INDIVIDUAL" && "개인"}
                  {category === "TEAM" && "팀"}
                </Typography>
                <Typography variant="caption10Medium" color="gray500">
                  스페이스
                </Typography>
              </div>
              <Typography variant="body12Strong" color="gray00">
                {name}
              </Typography>
            </section>
          </Tooltip.Content>
        </Tooltip>
      ) : (
        <SpaceButton space={space} isCollapsed={false} backgroundColor={getBackgroundColor()} onClick={handleSelectSpace} isLeader={isLeader} />
      )}
    </>
  );
}
