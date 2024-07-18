import { useState } from "react";

export const useRadioButton = () => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const isChecked = (value: string) => selectedValue === value;
  const onChange = (value: string) => setSelectedValue(value);

  return { isChecked, onChange, selectedValue };
};
