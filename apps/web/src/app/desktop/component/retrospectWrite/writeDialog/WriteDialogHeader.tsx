import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PhaseContext } from "..";
import { useModal } from "@/hooks/useModal";

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

  const spaceId = searchParams.get("spaceId");

  const handleClose = () => {
    if (hasChanges()) {
      handleOpenTemporarySaveModal();
    } else {
      navigate(PATHS.DesktopcompleteRetrospectCreate(spaceId as string));
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
      <div>
        <Icon
          icon="ic_close"
          size={1.8}
          css={css`
            color: ${DESIGN_TOKEN_COLOR.gray600};
            margin: 0.3rem;
            cursor: pointer;
          `}
          onClick={handleClose}
        />
        <Icon
          icon={isOverviewVisible ? "ic_expand" : "ic_shrink"}
          size={1.8}
          css={css`
            margin-left: 0.4rem;
            color: ${DESIGN_TOKEN_COLOR.gray600};
            margin: 0.3rem;
            cursor: pointer;
          `}
          onClick={handleToggleOverview}
        />
      </div>

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
