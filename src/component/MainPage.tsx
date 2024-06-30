/*NOTE - 해당 파일은 루트 router를 위한 임시 페이지입니다. 실제 페이지 작성 후 지워주세요! */
import { useAtom } from "jotai";

import { messageAtom } from "@/store/messageAtom";

function MainPage() {
  const [message, setMessage] = useAtom(messageAtom);
  return (
    <div>
      <span>welcome to layer 🎇</span>
      <div>{message}</div>
    </div>
  );
}

export default MainPage;
