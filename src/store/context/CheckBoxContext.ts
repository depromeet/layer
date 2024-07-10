import { createContext } from "react";

type CheckBoxContext = {
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const CheckBoxContext = createContext<CheckBoxContext | undefined>(undefined);
