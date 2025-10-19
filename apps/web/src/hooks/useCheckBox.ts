import { useState } from "react";

export const useCheckBox = () => {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});

  const isChecked = (value: string) => checkedStates[value];
  const toggle = (value: string) => setCheckedStates((prev) => ({ ...prev, [value]: !prev[value] }));
  const selectedValues = Object.keys(checkedStates).filter((key) => checkedStates[key]);

  const resetChecked = () => {
    setCheckedStates({});
  };

  return { isChecked, toggle, selectedValues, resetChecked };
};
