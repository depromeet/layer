import { css } from "@emotion/react";
import { useSetAtom } from "jotai";
import { useContext, useState } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { DateTimeInput } from "@/component/common/input/DateTimeInput";
import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { Spacing } from "@/component/common/Spacing";
import { useRadioButton } from "@/hooks/useRadioButton";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";

export function DueDate() {
  const { goNext, isMutatePending } = useContext(RetrospectCreateContext);
  const setRetroCreateData = useSetAtom(retrospectCreateAtom);
  const [selectedDateTime, setSelectedDateTime] = useState<string>();
  const { selectedValue, isChecked, onChange } = useRadioButton();

  const handleDataSave = () => {
    setRetroCreateData((prev) => ({ ...prev, deadline: selectedDateTime }));
  };

  const onNext = () => {
    handleDataSave();
    goNext();
  };

  return (
    <>
      <Header title={"회고는\n언제까지 작성할까요?"} />
      <Spacing size={4} />
      <RadioButtonGroup
        radioName="has-duedate"
        onChange={onChange}
        isChecked={isChecked}
        direction={"column"}
        styles={css`
          margin-bottom: 1.2rem;
        `}
      >
        <Radio value={"has-duedate-neg"} rounded="lg">
          마감일 미지정
        </Radio>
        <Radio value={"has-duedate-pos"} rounded="lg">
          마감일 지정
        </Radio>
      </RadioButtonGroup>
      {selectedValue === "has-duedate-pos" && (
        <DateTimeInput
          onValueChange={(value) => {
            setSelectedDateTime(value);
          }}
        />
      )}
      <ButtonProvider isProgress={isMutatePending}>
        <ButtonProvider.Primary
          onClick={onNext}
          disabled={(selectedValue === "has-duedate-pos" && !selectedDateTime) || !selectedValue}
          type="submit"
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
