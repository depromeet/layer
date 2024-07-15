import { css } from "@emotion/react";
import { createContext } from "react";

export type CheckBoxContextState = {
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const CheckBoxContext = createContext<CheckBoxContextState | undefined>(undefined);

type CheckBoxProps = {
  children: React.ReactNode;
} & CheckBoxContextState;

export function CheckBoxGroup({ children, ...props }: CheckBoxProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <CheckBoxContext.Provider value={props}>{children}</CheckBoxContext.Provider>
    </div>
  );
}
