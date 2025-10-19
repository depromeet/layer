import { MidModal } from "../MidModal";

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <MidModal
      title="로그아웃"
      content="정말 로그아웃 하시겠어요?"
      leftText="아니요"
      rightText="네"
      leftFun={onClose}
      rightFun={onConfirm}
      onClose={onClose}
    />
  );
}
