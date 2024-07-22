import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function Tab<T extends string>({ tabs, curTab, selectTab }: { tabs: T[]; curTab: T; selectTab: (tab: T) => void }) {
  return (
    <div css={css``}>
      {tabs.map((tab, index) => {
        return (
          <button
            key={index}
            onClick={() => selectTab(tab)}
            css={css`
              width: 50%;
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
      })}
    </div>
  );
}
