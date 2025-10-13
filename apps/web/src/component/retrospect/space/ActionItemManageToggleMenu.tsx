import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { ToggleMenu } from "@/component/common/toggleMenu";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

import useToggleMenu from "@/hooks/useToggleMenu";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";

export default function ActionItemManageToggleMenu({
  //   spaceId,
  iconSize = 1.8,
  iconColor = "gray900",
}: {
  spaceId: string;
  iconSize?: number;
  iconColor?: keyof typeof DESIGN_TOKEN_COLOR;
}) {
  const { isShowMenu, showMenu, hideMenu } = useToggleMenu();
  const { open: openDesktopModal } = useDesktopBasicModal();

  /**
   * @description 토글 메뉴 표시 함수
   * @param event - 클릭 이벤트
   */
  const handleShowToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    showMenu(event);
  };

  /**
   * @description 실행목표 편집 함수
   */
  const handleEditActionItem = () => {
    openDesktopModal({
      title: "실행목표 편집",
      contents: "dd",
      onClose: () => {},
      options: {
        enableFooter: false,
      },
    });
    hideMenu();
  };

  return (
    <div
      className="space-manage-toggle-menu"
      onClick={handleShowToggleMenu}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Icon
        id="space-item-more-icon"
        icon="ic_more"
        size={iconSize}
        css={css`
          cursor: pointer;
          margin-left: auto;
          color: ${DESIGN_TOKEN_COLOR[iconColor]};
        `}
      />
      {isShowMenu && (
        <ToggleMenu>
          <ToggleMenu.Button onClick={handleEditActionItem}> 실행목표 편집 </ToggleMenu.Button>
        </ToggleMenu>
      )}
    </div>
  );
}
