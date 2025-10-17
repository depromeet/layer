import { addedQuestionsListAtom } from "@/store/retrospect/addedAuestionsList";
import { useAtom } from "jotai";
import { useState } from "react";

export const useCheckBox = () => {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});
  const [checkedStatesWithAtom, setCheckedStatesWithAtom] = useAtom<Record<string, boolean>>(addedQuestionsListAtom);

  const isChecked = (value: string) => checkedStates[value];
  const isCheckedWithAtom = (value: string) => checkedStatesWithAtom[value];
  const toggle = (value: string) => setCheckedStates((prev) => ({ ...prev, [value]: !prev[value] }));
  const toggleWithAtom = (value: string) => setCheckedStatesWithAtom((prev) => ({ ...prev, [value]: !prev[value] }));
  const selectedValues = Object.keys(checkedStates).filter((key) => checkedStates[key]);
  const selectedValuesWithAtom = Object.keys(checkedStatesWithAtom).filter((key) => checkedStatesWithAtom[key]);

  const resetChecked = () => {
    setCheckedStates({});
  };

  const resetCheckedWithAtom = () => {
    setCheckedStatesWithAtom({});
  };

  return { isChecked, isCheckedWithAtom, toggle, toggleWithAtom, selectedValues, selectedValuesWithAtom, resetChecked, resetCheckedWithAtom };
};
