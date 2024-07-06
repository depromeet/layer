import { css } from "@emotion/react";
import { useState } from "react";

import Radio from "./Radio";

import { RadioContext } from "@/store/context/RadioContext";

type RadioButtonGroupProps = {
  items: { value: string; text: string }[];
};

const RadioButtonGroup = ({ items }: RadioButtonGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <RadioContext.Provider value={{ selectedValue, onChange: (val: string) => setSelectedValue(val) }}>
        {items.map(({ value, text }) => {
          return <Radio key={crypto.randomUUID()} value={value} text={text} />;
        })}
      </RadioContext.Provider>
    </div>
  );
};

export default RadioButtonGroup;
