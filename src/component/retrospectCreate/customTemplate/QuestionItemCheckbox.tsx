import { css } from "@emotion/react";
import { useContext } from "react";

import { CheckBoxContext } from "@/component/common/checkBox/CheckBoxGroup";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type QuestionItemCheckboxProps = {
  value: string;
  children: React.ReactNode;
};

export function QuestionItemCheckbox({ value, children }: QuestionItemCheckboxProps) {
  const checkboxContext = useContext(CheckBoxContext);
  return (
    <label
      htmlFor={value}
      css={css`
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        cursor: pointer;
      `}
    >
      {/**FIXME - design token - 폰트 사이즈 1.5! */}
      <Typography color="dark" variant="B2">
        {children}
      </Typography>
      <label
        htmlFor={value}
        css={css`
          width: 2rem;
          height: 2rem;
          border-radius: 0.4rem;
          border: 0.1rem solid;
          border-color: ${checkboxContext?.isChecked(value) ? DESIGN_SYSTEM_COLOR.theme : DESIGN_SYSTEM_COLOR.lightGrey3};
          background-color: ${checkboxContext?.isChecked(value) ? DESIGN_SYSTEM_COLOR.theme : "none"};
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        `}
      >
        {checkboxContext?.isChecked(value) && <Icon icon="ic_check" color="#fff" style={{ cursor: "pointer" }} />} {/*FIXME - design token*/}
      </label>
      <input
        type="checkbox"
        id={value}
        value={value}
        onChange={(e) => {
          checkboxContext?.onChange && checkboxContext.onChange(e.target.value);
        }}
        css={css`
          display: none;
        `}
      />
    </label>
  );
}
