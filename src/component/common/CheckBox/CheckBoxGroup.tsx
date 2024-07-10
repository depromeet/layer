import { css } from "@emotion/react";

import { CheckBoxContext } from "@/store/context/CheckBoxContext";

type CheckBoxGroupProps = {
  children: React.ReactNode;
  isChecked: (value: string) => boolean;
  onChange: (value: string) => void;
};

const CheckBoxGroup = ({ children, ...rest }: CheckBoxGroupProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <CheckBoxContext.Provider value={rest}>{children}</CheckBoxContext.Provider>
    </div>
  );
};

export default CheckBoxGroup;
