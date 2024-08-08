import { css } from "@emotion/react";
import { forwardRef, useContext, useState } from "react";

import { InputContext } from "./InputLabelContainer";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  width?: string;
  height?: string;
  count?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function ({ id, width = "100%", height = "8.4rem", count, ...props }, ref) {
  const { maxLength, value } = props;
  const [isFocused, setIsFocused] = useState(false);
  const textareaContext = useContext(InputContext);
  return (
    <div
      css={css`
        width: ${width};
        border: 1px solid;
        border-color: ${isFocused ? DESIGN_SYSTEM_COLOR.theme3 : "#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
        border-radius: 0.8rem;
        padding: 1.6rem;
        display: flex;
        flex-direction: column;
        height: ${height};
        transition: 0.2s all;
      `}
    >
      <textarea
        ref={ref}
        id={id || textareaContext?.id}
        css={css`
          ::placeholder {
            color: ${DESIGN_SYSTEM_COLOR.lightGrey5};
          }
          flex-shrink: 0;
          flex-grow: 1;
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {count && maxLength && (
        <div
          css={css`
            align-self: flex-end;
          `}
        >
          <Typography variant="CAPTION" color={value.length ? "theme3" : "lightGrey"}>
            {value.length}
          </Typography>
          <Typography variant="CAPTION" color={"lightGrey"}>{`/${maxLength}`}</Typography>
        </div>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";
