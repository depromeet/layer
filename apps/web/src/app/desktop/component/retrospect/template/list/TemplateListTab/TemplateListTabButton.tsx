import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { TabProps } from ".";

export function TemplateListTabButton<T extends string>({ tab, curTab, selectTab }: TabProps<T>) {
  const isActive = tab === curTab;

  return (
    <button
      onClick={() => selectTab(tab)}
      css={css`
        color: ${tab === curTab ? DESIGN_SYSTEM_COLOR.dark : DESIGN_SYSTEM_COLOR.lightGrey};
        padding: 0 0.4rem 0.8rem;
        position: relative;
      `}
    >
      <Typography
        variant="title16Bold"
        color={tab === curTab ? "dark" : "grey"}
        css={css`
          &::after {
            content: "";
            position: absolute;
            bottom: -0.2rem;
            left: 0.3rem;
            right: 0.3rem;
            height: 0.2rem;
            background-color: ${isActive ? DESIGN_SYSTEM_COLOR.dark : "transparent"};
          }
        `}
      >
        {tab}
      </Typography>
    </button>
  );
}
