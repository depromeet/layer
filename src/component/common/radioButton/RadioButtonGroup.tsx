import { css, Interpolation, Theme } from "@emotion/react";
import { createContext } from "react";

export type RadioContextState = {
  radioName: string;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
  radioStyles?: Interpolation<Theme>;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);

type RadioButtonGroupProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
  styles?: Interpolation<Theme>;
} & RadioContextState;

export function RadioButtonGroup({ children, styles, gap = 0.8, direction = "row", ...props }: RadioButtonGroupProps) {
  return (
    <div
      css={[
        css`
          display: flex;
          flex-direction: ${direction};
          gap: ${gap}rem;
          overflow: auto;
        `,
        styles,
      ]}
    >
      <RadioContext.Provider value={props}>{children}</RadioContext.Provider>
    </div>
  );
}
