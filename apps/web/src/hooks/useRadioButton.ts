import { useState } from "react";

export const useRadioButton = (defaultValue?: string) => {
  //FIXME - value를 제네릭 타입으로 수정하기
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const isChecked = (value: string) => selectedValue === value;
  const onChange = (value: string) => setSelectedValue(value);

  return { isChecked, onChange, selectedValue };
};
