import { css } from "@emotion/react";
import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation";
import DesktopFunnelModalHeader from "./DesktopFunnelModalHeader";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useModal } from "@/hooks/useModal";
import { RetrospectCreate } from "@/app/desktop/retrospectCreate/RetrospectCreate";
import TemplatePage from "@/app/desktop/retrospect/template/TemplatePage";

export default function DesktopFunnelModal() {
  const { open, close } = useModal();
  const { funnelModalState, closeFunnelModal } = useFunnelModal();

  if (!funnelModalState.isOpen) return null;

  // TODO 현재 모달 콘텐츠에 따른 메세지로 변경되어야합니다.
  // 현재는 임시로 회고 생성 중단에 대한 메세지로 구현
  const handleClose = () => {
    open({
      title: "회고 생성을 중단하시겠어요?",
      contents: "선택한 템플릿은 임시저장 되어요",
      options: {
        buttonText: ["취소", "나가기"],
      },

      onClose: () => {
        close();
      },
      onConfirm: () => {
        closeFunnelModal();
      },
    });
  };

  // 현재 스텝에 따라 컴포넌트 결정
  const getStepConfig = () => {
    switch (funnelModalState.currentStep) {
      case "retrospectCreate":
        return {
          title: "",
          content: <RetrospectCreate />,
        };
      case "template":
        return {
          title: "",
          content: <TemplatePage />,
        };
      default:
        return {
          title: "",
          content: null,
        };
    }
  };

  const { title, content } = getStepConfig();

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          background-color: rgba(0, 0, 0, 0.5);
        `}
      >
        <div
          css={css`
            width: 52rem;
            height: 65.2rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            padding: 2.4rem 2.4rem 0;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DesktopFunnelModalHeader title={title} onClose={handleClose} />
          {content}
        </div>
      </div>
    </Portal>
  );
}
