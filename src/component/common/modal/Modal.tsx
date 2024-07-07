import ModalPortal from "@/component/common/modal/ModalPortal";
import { css } from "@emotion/react";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

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
    // FIXME: 추후 디자인 토큰 연동 후 컬러 값 변경
    <ModalPortal>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          ref={modalRef}
          css={css`
            padding: 2rem;
            min-width: 30rem;
            min-height: 10rem;
            background-color: #ffffff;
            border: 1px solid #cbcbcb;
            border-radius: 1rem;
          `}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

export default Modal;
