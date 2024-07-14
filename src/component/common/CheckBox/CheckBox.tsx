import { css } from "@emotion/react";
import { useContext } from "react";

import { CheckBoxContext } from "./CheckBoxGroup";

import ListItemCard from "@/component/common/Card/ListItemCard";

type CheckBoxProps = {
  value: string;
  children: React.ReactNode;
};

const CheckBox = ({ value, children }: CheckBoxProps) => {
  const checkboxContext = useContext(CheckBoxContext);
  return (
    <ListItemCard variant={checkboxContext?.isChecked(value) ? "theme" : "default"}>
      <label
        htmlFor={value}
        css={css`
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          cursor: pointer;
        `}
      >
        {children}
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
    </ListItemCard>
  );
};

export default CheckBox;
