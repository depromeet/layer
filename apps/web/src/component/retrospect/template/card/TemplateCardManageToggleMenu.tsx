import { Icon } from "@/component/common/Icon";
import { ToggleMenu } from "@/component/common/toggleMenu";
import { useApiCloseRetrospect } from "@/hooks/api/retrospect/close/useApiCloseRetrospect";
import { useApiDeleteRetrospect } from "@/hooks/api/retrospect/useApiDeleteRetrospect";
import { useModal } from "@/hooks/useModal";
import useToggleMenu from "@/hooks/useToggleMenu";
import { queryClient } from "@/lib/tanstack-query/queryClient";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function TemplateCardManageToggleMenu({
  iconSize = 2.0,
  iconColor = "gray500",
  retrospectId,
  spaceId,
  isAnalyzed = false,
}: {
  iconSize?: number | string;
  iconColor?: keyof typeof DESIGN_TOKEN_COLOR;
  retrospectId: number;
  spaceId: number;
  isAnalyzed?: boolean;
}) {
  const { isShowMenu, showMenu } = useToggleMenu();
  const { mutateAsync: mutateDeleteRetrospect } = useApiDeleteRetrospect();
  const { mutateAsync: mutateCloseRetrospect } = useApiCloseRetrospect();
  const { open, close, setProgress } = useModal();

  /**
   * @description 토글 메뉴 표시 함수
   * @param event - 클릭 이벤트
   */
  const handleShowToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    showMenu(event);
  };

  // TODO: 인터페이스 타입 구조 한번 더 다시 잡기 (추상화 하려고 했으나, 잘못된 타입 단언들로 인해 추상화 불가)
  // 대상 : handleCloseRetrospect, handleRemoveRetrospect

  /**
   * @description 회고 마감 함수
   * getRetrospects
   */
  const handleCloseRetrospect = async () => {
    try {
      setProgress(true);
      await mutateCloseRetrospect({ spaceId: String(spaceId), retrospectId: retrospectId });
      queryClient.invalidateQueries({
        queryKey: ["getRetrospects"],
      });
    } catch (e) {
    } finally {
      setProgress(false);
      close();
    }
  };

  /**
   * @description 회고 삭제 함수
   */
  const handleRemoveRetrospect = async () => {
    try {
      setProgress(true);
      await mutateDeleteRetrospect({ spaceId: String(spaceId), retrospectId: String(retrospectId) });
    } catch (e) {
    } finally {
      setProgress(false);
      close();
    }
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
          <ToggleMenu.Button
            isShow={!isAnalyzed}
            onClick={() =>
              open({
                title: "회고를 마감하시겠어요?",
                contents: "마감하면 다시 되돌릴 수 없어요",
                options: {
                  buttonText: ["취소", "마감"],
                  autoClose: false,
                },
                onConfirm: handleCloseRetrospect,
                onClose: close,
              })
            }
          >
            회고 마감
          </ToggleMenu.Button>
          <ToggleMenu.Button> 회고 수정 </ToggleMenu.Button>
          <ToggleMenu.Button
            variant="subtitle14SemiBold"
            color="red500"
            onClick={() =>
              open({
                title: "회고를 삭제하시겠어요?",
                contents: "삭제하면 다시 되돌릴 수 없어요",
                options: {
                  buttonText: ["취소", "삭제"],
                  autoClose: false,
                },
                onConfirm: handleRemoveRetrospect,
                onClose: close,
              })
            }
          >
            회고 삭제
          </ToggleMenu.Button>
        </ToggleMenu>
      )}
    </div>
  );
}
