import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { TabProps } from "./TemplateListTabs";

export function TemplateListTabButton<T extends string>({ tab, curTab, selectTab }: TabProps<T>) {
  return (
    <button
      onClick={() => selectTab(tab)}
      css={css`
        color: ${tab === curTab ? DESIGN_SYSTEM_COLOR.dark : DESIGN_SYSTEM_COLOR.lightGrey};
        padding: 0 0.4rem 0.8rem;
        border-bottom: ${tab === curTab ? `0.2rem solid ${DESIGN_SYSTEM_COLOR.dark}` : "none"};
      `}
    >
      <Typography variant="title16Bold" color={tab === curTab ? "dark" : "grey"}>
        {tab}
      </Typography>
    </button>
  );
}
