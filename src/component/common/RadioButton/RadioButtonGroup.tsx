import { css } from "@emotion/react";

import { RadioContext } from "@/store/context/RadioContext";

type RadioButtonGroupProps = {
  children: React.ReactNode;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
  radioName: string;
};

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
