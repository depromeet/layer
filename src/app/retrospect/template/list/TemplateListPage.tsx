import { css } from "@emotion/react";

import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { useTabs } from "@/hooks/useTabs";
import { DualToneLayout } from "@/layout/DualToneLayout";

export function TemplateListPage() {
  const { tabs, curTab, selectTab } = useTabs(["기본", "커스텀"] as const);
  const TemplateListTabs = (
    <Tabs
      tabs={tabs}
      curTab={curTab}
      selectTab={selectTab}
      TabComp={TabButton}
      fullWidth={false}
      containerStyles={css`
        padding-top: 0.7rem;
      `}
    />
  );
  return (
    <DualToneLayout TopComp={TemplateListTabs} title="회고 템플릿 리스트">
      <div></div>
    </DualToneLayout>
  );
}
