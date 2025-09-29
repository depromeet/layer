import { css } from "@emotion/react";
import { forwardRef, useContext } from "react";

import { RadioContext } from "./RadioButtonGroup";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { getDeviceType } from "@/utils/deviceUtils";

type RadioProps = {
  value: string;
  children: React.ReactNode;
  rounded?: "sm" | "lg";
  size?: "sm" | "lg";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "size">;

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(function ({ value, rounded = "sm", size = "sm", children, ...props }, ref) {
  const { isDesktop } = getDeviceType();
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
        padding: ${isDesktop ? (size === "lg" ? "1.3rem 2rem" : "0.7rem 1.11rem") : "1.2rem 1.6rem"};
        border-radius: ${STYLE_MAP.borderRadius[rounded]};
        background-color: ${radioContext?.isChecked(value) ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray100};
        transition: 0.2s all;
        cursor: pointer;
      `}
    >
      <Typography
        color={radioContext?.isChecked(value) ? "gray00" : "gray800"}
        variant={isDesktop ? (size === "lg" ? "body15Medium" : "body12Medium") : "body16Medium"}
      >
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
