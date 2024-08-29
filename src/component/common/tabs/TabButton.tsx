import { css } from "@emotion/react";

import { TabProps } from "./Tabs";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function TabButton<T extends string>({ tab, curTab, selectTab }: TabProps<T>) {
  return (
    <button
      onClick={() => selectTab(tab)}
      css={css`
        flex-grow: 1;
        color: ${tab === curTab ? DESIGN_SYSTEM_COLOR.dark : DESIGN_SYSTEM_COLOR.lightGrey};
        padding: 1rem;
        border-bottom: ${tab === curTab ? `0.2rem solid ${DESIGN_SYSTEM_COLOR.dark}` : "none"};
      `}
    >
      <Typography variant="S3" color={tab === curTab ? "dark" : "grey"}>
        {tab}
      </Typography>
    </button>
  );
}
