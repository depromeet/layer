import { useEffect } from "react";

import Button from "@/component/Button/Button.tsx";
import { ButtonProvider } from "@/component/Button/ButtonProvider.tsx";
import CheckBox from "@/component/common/CheckBox/CheckBox";
import CheckBoxGroup from "@/component/common/CheckBox/CheckBoxGroup";
import Radio from "@/component/common/RadioButton/Radio";
import RadioButtonGroup from "@/component/common/RadioButton/RadioButtonGroup";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useRadioButton } from "@/hooks/useRadioButton";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export default function Staging() {
  const [isRadioChecked, onChange, selectedValue] = useRadioButton();
  const [isCheckBoxChecked, toggle, selectedValues] = useCheckBox();

  useEffect(() => {
    console.log("라디오 버튼 선택 value:", selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.log("체크박스 선택 values:", selectedValues);
  }, [selectedValues]);

  return (
    <DefaultLayout>
      <Button> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"gray"}> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"sky"}> 그냥 그저 그런 버튼 </Button>
      <Button colorSchema={"primary"}> 그냥 그저 그런 버튼 </Button>

      <br />
      <h3>라디오버튼</h3>
      <RadioButtonGroup isChecked={isRadioChecked} onChange={onChange} radioName={"프로젝트 주기"}>
        <Radio value={"0"}>주 1회</Radio>
        <Radio value={"1"}>월 1회</Radio>
        <Radio value={"2"}>분기별</Radio>
        <Radio value={"3"}>프로젝트 끝난 후</Radio>
      </RadioButtonGroup>

      <br />
      <h3>체크박스</h3>
      <CheckBoxGroup isChecked={isCheckBoxChecked} onChange={toggle}>
        <CheckBox value={"00"}>주 1회</CheckBox>
        <CheckBox value={"10"}>월 1회</CheckBox>
        <CheckBox value={"20"}>분기별</CheckBox>
        <CheckBox value={"30"}>프로젝트 끝난 후</CheckBox>
      </CheckBoxGroup>

      <ButtonProvider>
        <ButtonProvider.Primary>기본 버튼</ButtonProvider.Primary>
        <ButtonProvider.Sky>하늘색 버튼</ButtonProvider.Sky>
        <ButtonProvider.Gray>회색 버튼</ButtonProvider.Gray>
        <ButtonProvider.Primary disabled={true}>비활성화 버튼</ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
