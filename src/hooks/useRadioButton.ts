import { useState } from "react";

import { RadioContextState } from "@/store/context/RadioContext";

type UseRadioButtonReturn = [RadioContextState["isChecked"], RadioContextState["onChange"], string | undefined];

export const useRadioButton = (): UseRadioButtonReturn => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const isChecked = (value: string) => selectedValue === value;
  const onChange = (value: string) => setSelectedValue(value);

  return [isChecked, onChange, selectedValue];
};
