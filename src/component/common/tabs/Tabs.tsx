import { Interpolation, Theme } from "@emotion/react";

import { useTabs } from "@/hooks/useTabs";

export type TabProps<T extends string> = Omit<ReturnType<typeof useTabs<T>>, "tabs"> & { tab: T };

type TabsProps<T extends string> = ReturnType<typeof useTabs<T>> & {
  TabComp: React.ComponentType<TabProps<T>>;
  containerStyles?: Interpolation<Theme>;
};

export function Tabs<T extends string>({ tabs, curTab, selectTab, TabComp, containerStyles }: TabsProps<T>) {
  return (
    <div css={[containerStyles]}>
      {tabs.map((tab, index) => {
        return <TabComp key={index} selectTab={selectTab} curTab={curTab} tab={tab} />;
      })}
    </div>
  );
}
