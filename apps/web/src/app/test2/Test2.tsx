import { useModal } from "@/hooks/useModal";

function Test2() {
  const { open, close } = useModal();

  const handleDefaultModalOpen = () => {
    open({
      title: "모달 제목",
      variant: "default",
      contents: "",
      contentsElement: (
        <div>
          <span>모달 컨텐츠 영역</span>
        </div>
      ),
      onConfirm: () => {
        close();
        console.log("확인 버튼 클릭");
      },
    });
  };

  return (
    <div>
      <button onClick={handleDefaultModalOpen}>모달 열기</button>
    </div>
  );
}

export default Test2;
