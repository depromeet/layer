import { css } from "@emotion/react";
import { createContext } from "react";

export type CheckBoxContextState = {
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const CheckBoxContext = createContext<CheckBoxContextState | undefined>(undefined);

type CheckBoxGroupProps = {
  children: React.ReactNode;
  gap?: number;
} & CheckBoxContextState;

export function CheckBoxGroup({ children, gap = 1, ...props }: CheckBoxGroupProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${gap}rem;
      `}
    >
      <CheckBoxContext.Provider value={props}>{children}</CheckBoxContext.Provider>
    </div>
  );
}
