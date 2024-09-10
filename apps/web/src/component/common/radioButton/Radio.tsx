import { css } from "@emotion/react";
import { forwardRef, useContext } from "react";

import { RadioContext } from "./RadioButtonGroup";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RadioProps = {
  value: string;
  children: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked">;

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(function ({ value, children, ...props }, ref) {
  const radioContext = useContext(RadioContext);
  return (
    <label
      ref={ref}
      htmlFor={value}
      css={css`
        font-weight: 600;
        width: fit-content;
        padding: 1.2rem 1.6rem;
        border-radius: 0.6rem;
        background-color: ${radioContext?.isChecked(value) ? DESIGN_SYSTEM_COLOR.theme3 : DESIGN_SYSTEM_COLOR.lightGrey2};
        transition: 0.2s all;
        cursor: pointer;
      `}
    >
      <Typography color={radioContext?.isChecked(value) ? "white" : "darkGrayText"} variant={"body16Medium"}>
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
