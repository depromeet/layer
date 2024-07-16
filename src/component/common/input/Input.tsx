import { css } from "@emotion/react";
import { forwardRef, useContext } from "react";

import { InputContext } from "./InputLabelContainer";

type InputProps = {
  width?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function ({ id, width = "100%", ...props }: InputProps) {
  const inputContext = useContext(InputContext);
  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid #e3e6ea; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem;
        `}
      >
        <input
          id={id || inputContext?.id}
          css={css`
            width: 100%;
          `}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";
