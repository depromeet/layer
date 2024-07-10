import { css } from "@emotion/react";

import { CheckBoxContext, CheckBoxContextState } from "@/store/context/CheckBoxContext";

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
