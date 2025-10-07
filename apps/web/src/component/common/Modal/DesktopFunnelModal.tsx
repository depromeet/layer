import { css } from "@emotion/react";
import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useModal } from "@/hooks/useModal";
import DesktopFunnelModalHeader from "./DesktopFunnelModalHeader";
import { useAtomValue } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { usePostRecentTemplateId } from "@/hooks/api/template/usePostRecentTemplateId";
import { useResetAtom } from "jotai/utils";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";

export default function DesktopFunnelModal() {
  const { open, close } = useModal();
  const { funnelModalState, closeFunnelModal } = useFunnelModal();
  const resetRetroCreateData = useResetAtom(retrospectCreateAtom);
  const { spaceId, templateId } = useAtomValue(retrospectInitialState);
  const { mutate: postRecentTemplateId } = usePostRecentTemplateId(Number(spaceId));

  const quitPage = () => {
    postRecentTemplateId({ formId: Number(templateId), spaceId: Number(spaceId) });
    resetRetroCreateData();
    closeFunnelModal();
  };

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
        quitPage();
      },
    });
  };

  if (!funnelModalState.isOpen) return null;

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
            padding: 0 2.4rem;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DesktopFunnelModalHeader title={funnelModalState.title} onClose={handleClose} />
          {funnelModalState.contents}
        </div>
      </div>
    </Portal>
  );
}
