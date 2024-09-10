import { css, SerializedStyles } from "@emotion/react";
import { createContext, forwardRef } from "react";

export type RadioContextState = {
  radioName: string;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

export const RadioContext = createContext<RadioContextState | undefined>(undefined);

type RadioButtonGroupProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
  styles?: SerializedStyles;
} & RadioContextState;

export const RadioButtonGroup = forwardRef<HTMLDivElement, RadioButtonGroupProps>(function (
  { children, gap = 0.8, direction = "row", styles, radioName, isChecked, onChange },
  ref,
) {
  return (
    <div
      ref={ref}
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
      <RadioContext.Provider value={{ radioName, isChecked, onChange }}>{children}</RadioContext.Provider>
    </div>
  );
});

RadioButtonGroup.displayName = "RadioButtonGroup";
