import { css } from "@emotion/react";
import { useContext } from "react";

import ListItemCard from "@/component/common/Card/ListItemCard";
import { RadioContext } from "@/store/context/RadioContext";

type RadioProps = {
  value: string;
  text: string;
};

const Radio = ({ value, text }: RadioProps) => {
  const radioContext = useContext(RadioContext);
  return (
    <ListItemCard variant={radioContext?.selectedValue === value ? "theme" : "default"}>
      <label
        htmlFor={value}
        css={css`
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        `}
      >
        {text}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={(e) => {
          radioContext?.onChange && radioContext.onChange(e.target.value);
        }}
        css={css`
          display: none;
        `}
      />
    </ListItemCard>
  );
};

export default Radio;
