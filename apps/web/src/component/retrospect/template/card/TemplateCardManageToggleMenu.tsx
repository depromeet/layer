import { Icon } from "@/component/common/Icon";
import { ToggleMenu } from "@/component/common/toggleMenu";
import useToggleMenu from "@/hooks/useToggleMenu";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function TemplateCardManageToggleMenu({
  iconSize = 2.0,
  iconColor = "gray500",
}: {
  iconSize?: number | string;
  iconColor?: keyof typeof DESIGN_TOKEN_COLOR;
}) {
  const { isShowMenu, showMenu } = useToggleMenu();

  /**
   * @description 토글 메뉴 표시 함수
   * @param event - 클릭 이벤트
   */
  const handleShowToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    showMenu(event);
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
      onClick={handleShowToggleMenu}
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
          <ToggleMenu.Button> 회고 마감 </ToggleMenu.Button>
          <ToggleMenu.Button> 회고 수정 </ToggleMenu.Button>
          <ToggleMenu.Button variant="subtitle14SemiBold" color="red500">
            회고 삭제
          </ToggleMenu.Button>
        </ToggleMenu>
      )}
    </div>
  );
}
