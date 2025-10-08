import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { DesktopDateTimeInput } from "@/app/desktop/component/retrospectCreate/DesktopDateTimeInput";
import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { Spacing } from "@/component/common/Spacing";
import { useRadioButton } from "@/hooks/useRadioButton";
import { css } from "@emotion/react";
import { useContext, useState } from "react";
import { useSetAtom } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { RetrospectCreateContext } from "..";

export function DueDate() {
  const { goPrev, isMutatePending } = useContext(RetrospectCreateContext);
  const setRetroCreateData = useSetAtom(retrospectCreateAtom);
  const [selectedDateTime, setSelectedDateTime] = useState<string>();
  const { selectedValue, isChecked, onChange } = useRadioButton();

  const onNext = () => {
    setRetroCreateData((prev) => ({ ...prev, deadline: selectedDateTime }));
  };

  const buttonText = (selectedValue === "has-duedate-pos" && selectedDateTime) || selectedValue === "has-duedate-neg" ? "완료" : "다음";

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
        <Radio value={"has-duedate-neg"} rounded="lg" size="lg">
          마감일 미지정
        </Radio>
        <Radio value={"has-duedate-pos"} rounded="lg" size="lg">
          마감일 지정
        </Radio>
      </RadioButtonGroup>
      <div
        css={css`
          position: relative;
        `}
      >
        {selectedValue === "has-duedate-pos" && (
          <DesktopDateTimeInput
            onValueChange={(value) => {
              setSelectedDateTime(value);
            }}
          />
        )}
      </div>

      <ButtonProvider sort={"horizontal"} isProgress={isMutatePending}>
        <ButtonProvider.Gray onClick={goPrev}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary
          onClick={onNext}
          disabled={(selectedValue === "has-duedate-pos" && !selectedDateTime) || !selectedValue}
          type="submit"
        >
          {buttonText}
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
