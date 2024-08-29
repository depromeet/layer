import { useState } from "react";

export const useTabs = <T extends string>(tabs: readonly T[]) => {
  const [curTab, setCurTab] = useState(tabs[0]);

  const selectTab = (tab: T) => {
    setCurTab(tab);
  };

  return { tabs, curTab, selectTab };
};
