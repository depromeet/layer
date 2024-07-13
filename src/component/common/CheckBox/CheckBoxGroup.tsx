import { css } from "@emotion/react";
import { createContext } from "react";

export type CheckBoxContextState = {
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const CheckBoxContext = createContext<CheckBoxContextState | undefined>(undefined);

type CheckBoxGroupProps = {
  children: React.ReactNode;
} & CheckBoxContextState;

const CheckBoxGroup = ({ children, ...props }: CheckBoxGroupProps) => {
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
};

export default CheckBoxGroup;
