import { css } from "@emotion/react";
import { forwardRef, useContext, useState } from "react";

import { InputContext } from "./InputLabelContainer";
import { patterns } from "./patterns.const";

import { Typography } from "@/component/common/typography";
import { useValidation } from "@/hooks/useValidation";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type TextAreaProps = {
  value: string;
  width?: string;
  height?: string;
  count?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validations?: (keyof typeof patterns)[];
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function (
  { id, width = "100%", height = "8.4rem", count, validations, onChange, ...props },
  ref,
) {
  const { maxLength, value } = props;
  const [isFocused, setIsFocused] = useState(false);
  const textareaContext = useContext(InputContext);
  const { errorMsg, onInputValidate } = useValidation({ validations, maxLength });

  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid;
          border-color: ${isFocused ? DESIGN_TOKEN_COLOR["blue.600"] : DESIGN_TOKEN_COLOR["gray.300"]};
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
              color: ${DESIGN_TOKEN_COLOR["gray.500"]};
            }
            flex-shrink: 0;
            flex-grow: 1;
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e);
            onInputValidate(e);
          }}
          {...props}
        />
        {count && maxLength && (
          <div
            css={css`
              align-self: flex-end;
            `}
          >
            <Typography variant={"body12Medium"} color={value.length ? "blue.600" : "gray.500"}>
              {value.length}
            </Typography>
            <Typography variant={"body12Medium"} color={"gray.500"}>{`/${maxLength}`}</Typography>
          </div>
        )}
      </div>
      {errorMsg && (
        <div
          css={css`
            margin-top: 0.8rem;
          `}
        >
          <Typography color={"red.400"} variant={"body14Medium"}>
            {`*${errorMsg}`}
          </Typography>
        </div>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";
