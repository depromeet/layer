/*NOTE - 해당 파일은 루트 router를 위한 임시 페이지입니다. 실제 페이지 작성 후 지워주세요! */
import { useAtom } from "jotai";

import { messageAtom } from "@/store/messageAtom.tsx";
import Modal from "@/component/common/modal/Modal";
import useModal from "@/hooks/useModal";

function MainPage() {
  const [message] = useAtom(messageAtom);
  const { open, close, isOpen } = useModal();
  return (
    <>
      <div>
        <span>welcome to layer 🎇</span>
        <div onClick={open}>{message}</div>
      </div>
      <Modal onClose={close} isModalOpen={isOpen}>
        <div>냠냠</div>
      </Modal>
    </>
  );
}

export default MainPage;
