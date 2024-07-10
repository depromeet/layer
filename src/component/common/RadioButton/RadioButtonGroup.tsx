import { css } from "@emotion/react";

import { RadioContext, RadioContextState } from "@/store/context/RadioContext";

type RadioButtonGroupProps = {
  children: React.ReactNode;
} & RadioContextState;

const RadioButtonGroup = ({ children, ...rest }: RadioButtonGroupProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </div>
  );
};

export default RadioButtonGroup;
