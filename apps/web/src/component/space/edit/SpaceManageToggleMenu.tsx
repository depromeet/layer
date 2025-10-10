import ModifySpacePage from "@/app/desktop/space/modify/ModifySpacePage";
import { Icon } from "@/component/common/Icon";
import { ToggleMenu } from "@/component/common/toggleMenu";
import useModifySpace from "@/hooks/app/space/useModifySpace";
import { useDesktopBasicModal } from "@/hooks/useDesktopBasicModal";
import { useModal } from "@/hooks/useModal";
import useToggleMenu from "@/hooks/useToggleMenu";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function SpaceManageToggleMenu({
  iconSize = 1.8,
  iconColor = "gray900",
  spaceId,
}: {
  spaceId: string;
  iconSize?: number;
  iconColor?: keyof typeof DESIGN_TOKEN_COLOR;
}) {
  const { isShowMenu, showMenu } = useToggleMenu();
  const navigate = useNavigate();
  const { open: openDesktopModal } = useDesktopBasicModal();
  const { open: openAlertModal } = useModal();
  const { onSubmitDeleteSpace, initializeSearchQuery } = useModifySpace({ id: spaceId });

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
  const handleEditSpace = () => {
    navigate(`?spaceId=${spaceId}&method=edit`, { replace: true });
    openDesktopModal({
      title: "스페이스 수정",
      contents: <ModifySpacePage />,
      onClose: initializeSearchQuery,
      options: {
        enableFooter: true,
      },
    });
  };

  /**
   * @description 스페이스 삭제 함수
   */
  const handleDeleteSpace = () => {
    openAlertModal({
      title: "스페이스를 삭제하시겠어요?",
      contents: "스페이스를 다시 되돌릴 수 없어요",
      onConfirm: () => onSubmitDeleteSpace(spaceId),
    });
  };

  return (
    <div
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
          <ToggleMenu.Button onClick={handleEditSpace}> 스페이스 수정 </ToggleMenu.Button>
          <ToggleMenu.Button variant="subtitle14SemiBold" color="red500" onClick={handleDeleteSpace}>
            스페이스 삭제
          </ToggleMenu.Button>
        </ToggleMenu>
      )}
    </div>
  );
}
