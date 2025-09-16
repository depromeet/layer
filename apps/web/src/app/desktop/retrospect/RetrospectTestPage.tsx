import DesktopFunnelModal from "@/component/common/Modal/DesktopFunnelModal";
import { useModal } from "@/hooks/useModal";
import { css } from "@emotion/react";
import { RetrospectCreatePage } from "./create/RetrospectCreate";

// 회고 생성 모달을 위한 임시 페이지입니다.
export function RetrospectTestPage() {
  const { open } = useModal();

  const handleRetrospectCreate = () => {
    open({
      title: "",
      contents: <RetrospectCreatePage />,
    });
  };

  return (
    <div>
      <button
        css={css`
          border: 1px solid rgba(0, 0, 0, 0.3);
          padding: 5px 10px;
        `}
        onClick={handleRetrospectCreate}
      >
        회고 생성 버튼
      </button>
      <DesktopFunnelModal />
    </div>
  );
}
