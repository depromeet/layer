import { createContext } from "react";

type RadioContextState = {
  radioName: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);
