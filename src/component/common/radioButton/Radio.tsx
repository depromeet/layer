import { css } from "@emotion/react";
import { useContext } from "react";

import { RadioContext } from "./RadioButtonGroup";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RadioProps = {
  value: string;
  children: React.ReactNode;
};

export function Radio({ value, children }: RadioProps) {
  const radioContext = useContext(RadioContext);
  return (
    <label
      htmlFor={value}
      css={css`
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.2rem 1.6rem;
        border-radius: 0.6rem;
        background-color: ${radioContext?.isChecked(value) ? DESIGN_SYSTEM_COLOR.theme3 : DESIGN_SYSTEM_COLOR.lightGrey2};
        transition: 0.2s all;
        cursor: pointer;
      `}
    >
      {/*FIXME - semibold */}
      <Typography color={radioContext?.isChecked(value) ? "white" : "darkGrayText"} variant="B2">
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
      />
    </label>
  );
}
