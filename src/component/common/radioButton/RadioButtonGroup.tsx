import { css } from "@emotion/react";
import { createContext } from "react";

export type RadioContextState = {
  radioName: string;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);

type RadioButtonGroupProps = {
  children: React.ReactNode;
} & RadioContextState;

export function RadioButtonGroup({ children, ...props }: RadioButtonGroupProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <RadioContext.Provider value={props}>{children}</RadioContext.Provider>
    </div>
  );
}
