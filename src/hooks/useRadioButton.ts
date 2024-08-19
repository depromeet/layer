import { useState } from "react";

export const useRadioButton = (defaultValue?: string) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const isChecked = (value: string) => selectedValue === value;
  const onChange = (value: string) => setSelectedValue(value);

  return { isChecked, onChange, selectedValue };
};
