import { css } from "@emotion/react";

import { useTabs } from "@/hooks/useTabs";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export type TabProps<T extends string> = Omit<ReturnType<typeof useTabs<T>>, "tabs"> & { tab: T };

type TabsProps<T extends string> = ReturnType<typeof useTabs<T>> & {
  TabComp: React.ComponentType<TabProps<T>>;
};

export function TemplateListTab<T extends string>({ tabs, curTab, selectTab, TabComp }: TabsProps<T>) {
  return (
    <div
      css={[
        css`
          position: sticky;
          top: 5.7rem;
          background-color: #fff;
          display: inline-flex;
          gap: 0.8rem;
          padding-top: 2rem;
          z-index: 1001;
          border-bottom: 0.2rem solid ${DESIGN_TOKEN_COLOR.gray200};
        `,
      ]}
    >
      {tabs.map((tab, index) => {
        return <TabComp key={index} selectTab={selectTab} curTab={curTab} tab={tab} />;
      })}
    </div>
  );
}
