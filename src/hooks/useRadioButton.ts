import { useState } from "react";

type UseRadioButtonReturn = [(value: string) => boolean, (value: string) => void, string | undefined];

export const useRadioButton = (): UseRadioButtonReturn => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const isChecked = (value: string) => selectedValue === value;
  const onChange = (value: string) => setSelectedValue(value);

  return [isChecked, onChange, selectedValue];
};
