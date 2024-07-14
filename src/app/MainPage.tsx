/*NOTE - 해당 파일은 루트 router를 위한 임시 페이지입니다. 실제 페이지 작성 후 지워주세요! */
import { useAtom } from "jotai";

import Button from "@/component/Button/Button";
import { Icon } from "@/component/common/Icon/Icon";
import { Modal } from "@/component/common/Modal/Modal";
import { ToastList } from "@/component/common/Toast/ToastList";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { messageAtom } from "@/store/messageAtom.tsx";

function MainPage() {
  const [message] = useAtom(messageAtom);
  const { open } = useModal();
  const { toast } = useToast();

  return (
    <>
      <div>
        <span>welcome to layer 🎇</span>
        <div onClick={() => open({ title: "냠냠", content: "쩝쩝", callBack: () => console.log("확인") })}>{message}</div>
      </div>

      <Icon icon="ic_back" color="red" size={5} onClick={() => console.log("클릭")} />
      <Icon icon="ic_back" color={"rgba(0,0,0,0.6)"} size={2} />
      <Icon icon="ic_back" color="#00ff00" size={4} />
      <Icon icon="ic_check" color="black" size={4} />

      <Button onClick={() => toast.success("성공")} css={{ marginBottom: "1rem" }}>
        Success Toast
      </Button>
      <Button onClick={() => toast.error("에러")}>Error Toast</Button>

      <Modal />
      <ToastList />
    </>
  );
}

export default MainPage;
