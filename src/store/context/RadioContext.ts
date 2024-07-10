import { createContext } from "react";

export type RadioContextState = {
  radioName: string;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);
