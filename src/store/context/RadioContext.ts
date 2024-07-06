import { createContext } from "react";

type RadioContextState = {
  selectedValue?: string;
  onChange?: (value: string) => void;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);
