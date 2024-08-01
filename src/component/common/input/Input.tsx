import { css } from "@emotion/react";
import { forwardRef, useContext, useState } from "react";

import { InputContext } from "./InputLabelContainer";
import { validations } from "./validation.const";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type InputProps = {
  value: string;
  width?: string;
  count?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onValidate?: (e: React.ChangeEvent<HTMLInputElement>, validation: keyof typeof validations) => void;
  validation?: keyof typeof validations;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function ({ id, width = "100%", count, validation, onChange, ...props }, ref) {
  const { maxLength, value } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputContext = useContext(InputContext);

  const onInputValidate = (e: React.ChangeEvent<HTMLInputElement>, validation: keyof typeof validations) => {
    if (!e.target.value) return;

    let errorMsg = "";
    if (validation === "EXCLUDE_SPECIAL_CHARS" && validations["EXCLUDE_SPECIAL_CHARS"].test(e.target.value)) {
      errorMsg = "특수문자는 입력이 불가해요";
    }
    setError((prev) => ({ ...prev, errorMsg }));
  };

  const [error, setError] = useState<{
    isRequired: boolean;
    validation: keyof typeof validations;
    errorMsg: string;
    onInputValidate: typeof onInputValidate;
  }>({
    isRequired: false,
    validation: "EXCLUDE_SPECIAL_CHARS",
    errorMsg: "",
    onInputValidate,
  });

  console.log("error.errorMsg", error.errorMsg);

  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid;
          border-color: ${isFocused ? DESIGN_SYSTEM_COLOR.theme3 : "#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem;
          display: flex;
          transition: 0.2s all;
        `}
      >
        <input
          ref={ref}
          id={id || inputContext?.id}
          css={css`
            flex-grow: 1;
            ::placeholder {
              color: ${DESIGN_SYSTEM_COLOR.lightGrey5};
            }
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e);
            if (!validation) return;
            onInputValidate(e, validation);
          }}
          {...props}
        />
        {/* FIXME - typography 컬러 넣기 !! */}
        {count && maxLength && (
          <>
            <Typography variant="CAPTION" color={value.length ? "theme3" : "lightGrey"}>
              {value.length}
            </Typography>
            <Typography variant="CAPTION" color={"lightGrey"}>{`/${maxLength}`}</Typography>
          </>
        )}
      </div>
      {error.errorMsg && (
        <div
          css={css`
            margin-top: 0.8rem;
          `}
        >
          <Typography color="red400" variant="B2">
            {`*${error.errorMsg}`}
          </Typography>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
