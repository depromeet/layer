import DesktopFunnelModal from "@/component/common/Modal/DesktopFunnelModal";
import { useModal } from "@/hooks/useModal";
import { css } from "@emotion/react";
import { RetrospectCreatePage } from "./create/RetrospectCreate";

// 회고 생성 모달을 위한 임시 페이지입니다.
export function RetrospectTestPage() {
  const { open } = useModal();

  /**
   * 임시로 contents로 '회고 생성'폼을 지정했습니다.
   * 템플릿 변경, 전역 데이터 전달을 위해 설계에 대해 고민중입니다.
   */
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
