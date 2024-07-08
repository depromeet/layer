import { css } from "@emotion/react";

import { RadioContext } from "@/store/context/RadioContext";

type RadioButtonGroupProps = {
  children: React.ReactNode;
  selectedValue: string | undefined;
  onChange: React.Dispatch<React.SetStateAction<string | undefined>>;
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
