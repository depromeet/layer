import { css } from "@emotion/react";
import { forwardRef, useContext, useMemo, useState } from "react";

import { InputContext } from "./InputLabelContainer";
import { patterns } from "./patterns.const";

import { Typography } from "@/component/common/typography";
import { useValidation } from "@/hooks/useValidation";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";

type InputProps = {
  value: string;
  width?: string;
  count?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validations?: (keyof typeof patterns)[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "pattern">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function ({ id, width = "100%", count, validations, onChange, ...props }, ref) {
  const { maxLength, value } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputContext = useContext(InputContext);
  const { errorMsg, onInputValidate } = useValidation({ validations, maxLength });

  const combinedPattern = useMemo(
    () => (validations ? validations.map((validation) => patterns[validation]["pattern"].source).join("|") : undefined),
    [validations],
  );

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          width: ${width};
          border: 1px solid;
          border-color: ${isFocused ? DESIGN_TOKEN_COLOR["blue600"] : DESIGN_TOKEN_COLOR["gray300"]};
          border-radius: 1.2rem;
          padding: 1.6rem;
          display: flex;
          transition: 0.2s all;
        `}
      >
        <input
          ref={ref}
          type="text"
          id={id || inputContext?.id}
          css={css`
            flex-grow: 1;
            ::placeholder {
              color: ${DESIGN_TOKEN_COLOR["gray500"]};
              ${DESIGN_TOKEN_TEXT["body15Medium"]}
            }
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e);
            onInputValidate(e);
          }}
          pattern={combinedPattern}
          {...props}
        />
        {count && maxLength && (
          <>
            <Typography variant={"body12Medium"} color={value.length ? "blue600" : "gray500"}>
              {value.length > maxLength ? maxLength : value.length}
            </Typography>
            <Typography variant={"body12Medium"} color={"gray500"}>{`/${maxLength}`}</Typography>
          </>
        )}
      </div>
      {errorMsg && (
        <div
          css={css`
            position: absolute;
            bottom: -2.5rem;
          `}
        >
          <Typography color={"red400"} variant={"body14Medium"}>
            {`*${errorMsg}`}
          </Typography>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
