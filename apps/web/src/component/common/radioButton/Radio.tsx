import { css } from "@emotion/react";
import { forwardRef, useContext } from "react";

import { RadioContext } from "./RadioButtonGroup";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type RadioProps = {
  value: string;
  children: React.ReactNode;
  rounded?: "sm" | "lg";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked">;

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(function ({ value, rounded = "sm", children, ...props }, ref) {
  const radioContext = useContext(RadioContext);

  const STYLE_MAP = {
    borderRadius: {
      sm: "0.6rem",
      lg: "0.8rem",
    },
  } as const;

  return (
    <label
      ref={ref}
      htmlFor={value}
      css={css`
        font-weight: 600;
        width: fit-content;
        padding: 1.2rem 1.6rem;
        border-radius: ${STYLE_MAP.borderRadius[rounded]};
        background-color: ${radioContext?.isChecked(value) ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray100};
        transition: 0.2s all;
        cursor: pointer;
      `}
    >
      <Typography color={radioContext?.isChecked(value) ? "gray00" : "gray800"} variant={"body16Medium"}>
        {children}
      </Typography>
      <input
        type="radio"
        name={radioContext?.radioName}
        id={value}
        value={value}
        onChange={(e) => {
          radioContext?.onChange && radioContext.onChange(e.target.value);
        }}
        css={css`
          display: none;
        `}
        {...props}
      />
    </label>
  );
});

Radio.displayName = "Radio";
