import { css } from "@emotion/react";
import { createContext } from "react";

type InputLabelContainerProps = {
  id: string;
  children: React.ReactNode;
};

export const InputContext = createContext<{ id: string } | undefined>(undefined);

export function InputLabelContainer({ id, children }: InputLabelContainerProps) {
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
      >
        {children}
      </div>
    </InputContext.Provider>
  );
}
