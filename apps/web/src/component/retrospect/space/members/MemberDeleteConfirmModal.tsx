import { MidModal } from "@/component/common/Modal/MidModal";

interface MemberDeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function MemberDeleteConfirmModal({ onConfirm, onCancel }: MemberDeleteConfirmModalProps) {
  return (
    <MidModal
      title="팀원을 삭제하시겠어요?"
      content="삭제하시면 다시 되돌릴 수 없어요"
      leftText="취소"
      rightText="삭제"
      leftFun={onCancel}
      rightFun={onConfirm}
      onClose={onCancel}
    />
  );
}
