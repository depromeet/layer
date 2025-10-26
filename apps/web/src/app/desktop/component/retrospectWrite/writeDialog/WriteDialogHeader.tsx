import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PhaseContext } from "..";
import { useModal } from "@/hooks/useModal";
import { useNavigation } from "@/component/common/LocalNavigationBar/context/NavigationContext";

interface WriteDialogHeaderProps {
  isOverviewVisible: boolean;
  isComplete: boolean;
  handleToggleOverview: () => void;
  hasChanges: () => boolean;
  handleOpenTemporarySaveModal: () => void;
  onSubmitWriteDone: () => void;
}

export function WriteDialogHeader({
  isOverviewVisible,
  isComplete,
  handleToggleOverview,
  hasChanges,
  handleOpenTemporarySaveModal,
  onSubmitWriteDone,
}: WriteDialogHeaderProps) {
  const { open } = useModal();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { movePhase } = useContext(PhaseContext);
  const { isCollapsed, toggleCollapse } = useNavigation();

  const spaceId = searchParams.get("spaceId");

  const originalIsCollapsedRef = useRef<boolean>(isCollapsed);

  const handleClose = () => {
    if (hasChanges()) {
      handleOpenTemporarySaveModal();
    } else {
      // * LocalNavigationBar 상태 복원 로직
      if (isCollapsed && !originalIsCollapsedRef.current) {
        toggleCollapse();
      }
      navigate(PATHS.DesktopCompleteRetrospectCreate(spaceId as string));
    }
  };

  const handleSubmitWrite = () => {
    open({
      title: "회고를 제출할까요?",
      contents: "제출하고 난 뒤에는\n더 이상 회고를 수정할 수 없어요",
      options: {
        buttonText: ["취소", "제출하기"],
      },
      onConfirm: onSubmitWriteDone,
    });
  };

  const onToggleOverview = () => {
    // * WriteDialog 확대 시, LocalNavigationBar 자동 축소
    if (!isCollapsed) {
      toggleCollapse();
    }
    handleToggleOverview();
  };

  return (
    <header
      css={css`
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.4rem;
        padding-top: 2rem;
        background-color: #fff;
      `}
    >
      <section
        css={css`
          display: flex;
          gap: 1.2rem;
        `}
      >
        <Icon
          icon="ic_analysis_close"
          size={2.0}
          css={css`
            color: ${DESIGN_TOKEN_COLOR.gray600};
            cursor: pointer;
          `}
          onClick={handleClose}
        />
        <Icon
          icon={isOverviewVisible ? "ic_expand" : "ic_shrink"}
          size={2.0}
          css={css`
            color: ${DESIGN_TOKEN_COLOR.gray600};
            cursor: pointer;
          `}
          onClick={onToggleOverview}
        />
      </section>

      {isComplete && (
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.8rem;
          `}
        >
          <button
            onClick={() => {
              movePhase(0);
            }}
            css={css`
              padding: 0.8rem 1.2rem;
              background-color: ${DESIGN_TOKEN_COLOR.blue100};
              border-radius: 0.8rem;
            `}
          >
            <Typography variant="subtitle14Bold" color="blue600">
              수정
            </Typography>
          </button>
          <button
            onClick={handleSubmitWrite}
            css={css`
              padding: 0.8rem 1.2rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray900};
              border-radius: 0.8rem;
            `}
          >
            <Typography variant="subtitle14Bold" color="white">
              제출하기
            </Typography>
          </button>
        </div>
      )}
    </header>
  );
}
