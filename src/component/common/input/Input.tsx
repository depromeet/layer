import { css } from "@emotion/react";
import { forwardRef, useContext } from "react";

import { InputContext } from "./InputLabelContainer";

import { Typography } from "@/component/common/typography";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  wordCount?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function ({ id, width = "100%", wordCount, ...props }: InputProps) {
  const { maxLength, value } = props;
  const inputContext = useContext(InputContext);
  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid ${"#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem;
          display: flex;
        `}
      >
        <input
          id={id || inputContext?.id}
          css={css`
            width: 100%;
          `}
          {...props}
        />
        {/* FIXME - typography 컬러 넣기 !! */}
        {wordCount && maxLength && <Typography variant="CAPTION">{`${value.length}/${maxLength}`}</Typography>}
      </div>
    </div>
  );
});

Input.displayName = "Input";
