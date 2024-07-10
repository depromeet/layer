import { createContext } from "react";

type RadioContextState = {
  radioName: string;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);
