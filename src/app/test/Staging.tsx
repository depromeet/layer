import { css } from "@emotion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { CheckBox, CheckBoxGroup } from "@/component/common/checkBox";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";
import { useCheckBox } from "@/hooks/useCheckBox";
import { useInput } from "@/hooks/useInput";
import { useRadioButton } from "@/hooks/useRadioButton";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export default function Staging() {
  const { isChecked: isRadioChecked, onChange, selectedValue } = useRadioButton();
  const { isChecked: isCheckBoxChecked, toggle, selectedValues } = useCheckBox();
  const { openBottomSheet, bottomSheetState } = useBottomSheet();
  const [number, setNumber] = useState(0);
  const { value: layerName, handleInputChange: handleChangeName } = useInput();
  const { value: description, handleInputChange: handleChangeDescription } = useInput();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("라디오 버튼 선택 value:", selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.log("체크박스 선택 values:", selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    console.log("현재 바텀 시트 상태: ", bottomSheetState);
  }, [bottomSheetState]);

  useEffect(() => {
    console.log("inputRef.current?.validity", inputRef.current?.validity.patternMismatch);
  }, [layerName]);

  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <ProgressBar
        curPage={number}
        lastPage={5}
        css={css`
          margin-bottom: 1rem;
        `}
      />
      <Button onClick={() => setNumber(number + 1)}>업</Button>
      <Button onClick={() => setNumber(number - 1)}>다운</Button>
      <Button onClick={openBottomSheet}> 그냥 그저 그런 버튼 </Button>
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

      <br />
      <InputLabelContainer id={"retro"}>
        <Label order={1}>회고 이름</Label>
        <Input ref={inputRef} onChange={handleChangeName} value={layerName} maxLength={10} count validations={["NO_SPECIAL_CHARS", "ONLY_KO"]} />
      </InputLabelContainer>

      <InputLabelContainer id={"description"}>
        <Label>한 줄 설명</Label>
        <TextArea onChange={handleChangeDescription} value={description} maxLength={20} count validations={["NO_SPECIAL_CHARS", "ONLY_KO"]} />
      </InputLabelContainer>

      <BottomSheet
        title={"헬로우"}
        contents={
          <Fragment>
            <p> 완전 이거 럭키비키자냐?</p>
          </Fragment>
        }
        handler={true}
      />

      <ButtonProvider>
        <ButtonProvider.Primary onClick={() => navigate(-1)}>기본 버튼</ButtonProvider.Primary>
        <ButtonProvider.Sky>하늘색 버튼</ButtonProvider.Sky>
        <ButtonProvider.Gray>회색 버튼</ButtonProvider.Gray>
        <ButtonProvider.Primary disabled={true}>비활성화 버튼</ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
