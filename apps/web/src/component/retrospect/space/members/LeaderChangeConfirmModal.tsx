import { MidModal } from "@/component/common/Modal/MidModal";

interface LeaderChangeConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function LeaderChangeConfirmModal({ onConfirm, onCancel }: LeaderChangeConfirmModalProps) {
  return (
    <MidModal
      title="대표자를 변경하시겠어요?"
      content="대표자를 변경하면 팀 스페이스 관리 권한이 변경돼요"
      leftText="취소"
      rightText="변경"
      leftFun={onCancel}
      rightFun={onConfirm}
      onClose={onCancel}
    />
  );
}
