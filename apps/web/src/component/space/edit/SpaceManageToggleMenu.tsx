import ModifySpacePage from "@/app/desktop/space/modify/ModifySpacePage";
import { Icon } from "@/component/common/Icon";
import { ToggleMenu } from "@/component/common/toggleMenu";
import { useApiLeaveSpace } from "@/hooks/api/space/useApiLeaveSpace";
import useModifySpace, { MODIFY_SPACE_METHOD_QUERY_KEY, MODIFY_SPACE_ID_QUERY_KEY } from "@/hooks/app/space/useModifySpace";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useModal } from "@/hooks/useModal";
import useToggleMenu from "@/hooks/useToggleMenu";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useSearchParams } from "react-router-dom";

export default function SpaceManageToggleMenu({
  spaceId,
  isLeader,
  iconSize = 1.8,
  iconColor = "gray900",
}: {
  spaceId: string;
  isLeader: boolean;
  iconSize?: number | string;
  iconColor?: keyof typeof DESIGN_TOKEN_COLOR;
}) {
  const { isShowMenu, showMenu, hideMenu } = useToggleMenu();
  const { open: openDesktopModal } = useDesktopBasicModal();
  const { open: openAlertModal } = useModal();
  const { onSubmitDeleteSpace, initializeSearchQuery } = useModifySpace({ id: spaceId.toString() });
  const [_, setSearchParams] = useSearchParams();
  const { mutate: leaveSpace } = useApiLeaveSpace();

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
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      [MODIFY_SPACE_ID_QUERY_KEY]: spaceId,
      [MODIFY_SPACE_METHOD_QUERY_KEY]: "edit",
    }));
    openDesktopModal({
      title: "스페이스 수정",
      contents: <ModifySpacePage />,
      onClose: initializeSearchQuery,
      options: {
        enableFooter: false,
      },
    });
    hideMenu();
  };

  /**
   * @description 스페이스 삭제 함수
   */
  const handleDeleteSpace = () => {
    openAlertModal({
      title: "스페이스를 삭제하시겠어요?",
      contents: "스페이스를 다시 되돌릴 수 없어요",
      onConfirm: () => onSubmitDeleteSpace(spaceId),
      options: {
        buttonText: ["취소", "삭제"],
      },
    });
  };

  /**
   * @description 스페이스 떠나기 함수
   */
  const handleLeaveSpace = () => {
    openAlertModal({
      title: "스페이스를 떠나시겠어요?",
      contents: "떠난 스페이스는 다시 돌아올 수 없어요",
      onConfirm: () => leaveSpace(spaceId),
      options: {
        buttonText: ["취소", "떠나기"],
      },
    });
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
          {isLeader ? (
            <>
              <ToggleMenu.Button onClick={handleEditSpace}>스페이스 수정</ToggleMenu.Button>
              <ToggleMenu.Button variant="subtitle14SemiBold" color="red500" onClick={handleDeleteSpace}>
                스페이스 삭제
              </ToggleMenu.Button>
            </>
          ) : (
            <ToggleMenu.Button variant="subtitle14SemiBold" color="red500" onClick={handleLeaveSpace}>
              스페이스 떠나기
            </ToggleMenu.Button>
          )}
        </ToggleMenu>
      )}
    </div>
  );
}
