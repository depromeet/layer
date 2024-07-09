import { useState } from "react";

import Button from "@/component/Button/Button.tsx";
import { ButtonProvider } from "@/component/Button/ButtonProvider.tsx";
import Radio from "@/component/common/RadioButton/Radio";
import RadioButtonGroup from "@/component/common/RadioButton/RadioButtonGroup";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export default function Staging() {
  const [selectedValue, setSelectedValue] = useState<string>();
  return (
    <DefaultLayout>
      <Button> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"gray"}> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"sky"}> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"primary"}> 그냥 그저 그런 버튼 </Button>

      <RadioButtonGroup radioName={"프로젝트 주기"} selectedValue={selectedValue} onChange={setSelectedValue}>
        <Radio value={"0"}>주 1회</Radio>
        <Radio value={"1"}>월 1회</Radio>
        <Radio value={"2"}>분기별</Radio>
        <Radio value={"3"}>프로젝트 끝난 후</Radio>
      </RadioButtonGroup>

      <ButtonProvider>
        <ButtonProvider.Primary>기본 버튼</ButtonProvider.Primary>
        <ButtonProvider.Sky>하늘색 버튼</ButtonProvider.Sky>
        <ButtonProvider.Gray>회색 버튼</ButtonProvider.Gray>
        <ButtonProvider.Primary disabled={true}>비활성화 버튼</ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
