import { useState } from "react";

import { CheckBoxContextState } from "@/store/context/CheckBoxContext";

type UseCheckBoxReturn = [CheckBoxContextState["isChecked"], CheckBoxContextState["onChange"], string[]];

export const useCheckBox = (): UseCheckBoxReturn => {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});
  const isChecked = (value: string) => checkedStates[value];
  const toggle = (value: string) => setCheckedStates((prev) => ({ ...prev, [value]: !prev[value] }));
  const selectedValues = Object.keys(checkedStates).filter((key) => checkedStates[key]);
  return [isChecked, toggle, selectedValues];
};
