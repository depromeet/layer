import { MidModal } from "../MidModal";

type DeleteAccountConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteAccountConfirmModal({ isOpen, onClose, onConfirm }: DeleteAccountConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <MidModal
      title="계정 탈퇴"
      content="계정 탈퇴시 모든 회고 정보가 날아가요.&#10;정말 계정 탈퇴를 진행하시겠어요?"
      leftText="아니요"
      rightText="네"
      leftFun={onClose}
      rightFun={onConfirm}
      onClose={onClose}
    />
  );
}
