import Button from "@/component/Button/Button.tsx";
import { ButtonProvider } from "@/component/Button/ButtonProvider.tsx";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export default function Staging() {
  return (
    <DefaultLayout>
      <Button> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"gray"}> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"sky"}> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"primary"}> 그냥 그저 그런 버튼 </Button>

      <ButtonProvider>
        <ButtonProvider.Primary>기본 버튼</ButtonProvider.Primary>
        <ButtonProvider.Sky>하늘색 버튼</ButtonProvider.Sky>
        <ButtonProvider.Gray>회색 버튼</ButtonProvider.Gray>
        <ButtonProvider.Primary disabled={true}>비활성화 버튼</ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
