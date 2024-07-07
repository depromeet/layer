import ModalPortal from "@/component/common/modal/ModalPortal";
import { css } from "@emotion/react";
import { memo, useEffect, useRef } from "react";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

function Modal({ onClose, isModalOpen, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 오픈 시 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  // 모달 영역 이외 클릭 시 모달 닫기
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [onClose, modalRef]);

  if (!isModalOpen) return null;

  return (
    <ModalPortal>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100dvh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          ref={modalRef}
          css={css`
            padding: 20px;
            min-width: 300px;
            min-height: 100px;
            background-color: #ffffff;
            border: 1px solid #cbcbcb;
            border-radius: 10px;
          `}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

export default memo(Modal);
