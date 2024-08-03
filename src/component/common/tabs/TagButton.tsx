import { css } from "@emotion/react";

import { TabProps } from "./Tabs";

import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function TagButton<T extends string>({ tab, curTab, selectTab }: TabProps<T>) {
  return (
    <button
      css={css`
        background-color: ${tab === curTab ? DESIGN_SYSTEM_COLOR.dark : DESIGN_SYSTEM_COLOR.lightGrey2};
        color: ${tab === curTab ? DESIGN_SYSTEM_COLOR.white : DESIGN_SYSTEM_COLOR.darkGrayText};
        padding: 1.2rem 1.6rem;
        border-radius: 0.8rem;
        flex-shrink: 0;
      `}
      onClick={() => selectTab(tab)}
    >
      {tab}
    </button>
  );
}
