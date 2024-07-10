import { createContext } from "react";

export type CheckBoxContextState = {
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const CheckBoxContext = createContext<CheckBoxContextState | undefined>(undefined);
