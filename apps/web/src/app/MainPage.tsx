/*NOTE - 해당 파일은 루트 router를 위한 임시 페이지입니다. 실제 페이지 작성 후 지워주세요! */
import { useAtom } from "jotai";

import { Button } from "@/component/common/button";
import { Toast } from "@/component/common/Toast";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { messageAtom } from "@/store/messageAtom.tsx";

function MainPage() {
  const [message] = useAtom(messageAtom);
  const { open } = useModal();
  const { toast } = useToast();

  return (
    <main>
      <section>
        <h1>welcome to layer 🎇</h1>
        <Button
          onClick={() =>
            open({
              title: "냠냠",
              contents: "쩝쩝",
              options: {
                type: "alert",
                buttonText: ["확인했어요"],
              },
            })
          }
        >
          {message}
        </Button>
        <Button
          onClick={() =>
            open({
              title: "냠냠2",
              contents: "쩝쩝2",
              options: {
                type: "confirm",
                buttonText: ["테스트1", "테스트2"],
                autoClose: true,
              },
            })
          }
        >
          {message}
        </Button>
        <Button
          onClick={() =>
            open({
              title: "냠냠2",
              contents: "쩝쩝2",
            })
          }
        >
          {message}
        </Button>
      </section>

      <Button onClick={() => toast.success("성공")} css={{ marginBottom: "1rem" }}>
        Success Toast
      </Button>
      <Button onClick={() => toast.error("에러")}>Error Toast</Button>

      <Toast />
    </main>
  );
}

export default MainPage;
