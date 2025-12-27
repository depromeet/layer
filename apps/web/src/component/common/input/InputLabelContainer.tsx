import { css } from "@emotion/react";
import React, { createContext } from "react";

type InputLabelContainerProps = {
  id: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const InputContext = createContext<{ id: string } | undefined>(undefined);

export function InputLabelContainer({ id, children, ...props }: InputLabelContainerProps) {
  return (
    <InputContext.Provider value={{ id }}>
      <div
        css={[
          css`
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `,
        ]}
        {...props}
      >
        {children}
      </div>
    </InputContext.Provider>
  );
}
