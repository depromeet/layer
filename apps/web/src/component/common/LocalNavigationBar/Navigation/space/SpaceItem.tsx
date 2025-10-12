import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { Typography } from "../../../typography";
import { useNavigation } from "../../context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Space } from "@/types/spaceType";
import { currentSpaceState } from "@/store/space/spaceAtom";

import spaceDefaultImg from "@/assets/imgs/space/spaceDefaultImg.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useToggleMenu from "@/hooks/useToggleMenu";
import { useApiDeleteSpace } from "@/hooks/api/space/useApiDeleteSpace";
import { useModal } from "@/hooks/useModal";
import { ToggleMenu } from "@/component/common/toggleMenu";
import { Icon } from "@/component/common/Icon";

interface SpaceItemProps {
  space: Space;
  refresh: () => void;
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

export default function SpaceItem({ space, refresh }: SpaceItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isCollapsed } = useNavigation();
  const { id: spaceId, name, introduction, bannerUrl } = space;
  const { showMenu, isShowMenu } = useToggleMenu();
  const { open } = useModal();
  const { mutate: deleteSpace, isSuccess } = useApiDeleteSpace();

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
   * @description 토글 메뉴 표시 함수
   * @param event - 클릭 이벤트
   */
  const handleShowToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    showMenu(event);
  };

  /**
   * @description 스페이스 수정 함수
   */
  const handleEditSpace = () => {};

  /**
   * @description 스페이스 삭제 함수
   */
  const handleDeleteSpace = () => {
    open({
      title: "스페이스를 삭제하시겠어요?",
      contents: "스페이스를 다시 되돌릴 수 없어요",
      onConfirm: () => deleteSpace(spaceId),
    });
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

  useEffect(() => {
    // 삭제 요청 성공 시에, 스페이스 리스트를 새로고침 합니다.
    if (isSuccess) {
      refresh();
    }
  }, [isSuccess]);

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

          #space-item-more-icon {
            visibility: visible;
          }
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

      <div
        onClick={handleShowToggleMenu}
        css={css`
          margin-left: auto;
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
        <Icon
          id="space-item-more-icon"
          icon="ic_more"
          size={1.8}
          css={css`
            visibility: ${isShowMenu ? "visible" : "hidden"};
            cursor: pointer;
            margin-left: auto;
            color: ${DESIGN_TOKEN_COLOR.gray500};
          `}
        />
        {isShowMenu && (
          <ToggleMenu>
            <ToggleMenu.Button onClick={handleEditSpace}> 스페이스 수정 </ToggleMenu.Button>
            <ToggleMenu.Button variant="subtitle14SemiBold" color="red500" onClick={handleDeleteSpace}>
              스페이스 삭제
            </ToggleMenu.Button>
          </ToggleMenu>
        )}
      </div>
    </li>
  );
}
