import { css } from "@emotion/react";
import { createContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { Typography } from "@/component/common/typography";
import { DefaultTemplateListItem } from "@/component/retrospect/template/list";
import { CustomTemplateList } from "@/component/retrospect/template/list/CustomTemplateList";
import { useGetDefaultTemplateList } from "@/hooks/api/template/useGetDefaultTemplateList";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { useTabs } from "@/hooks/useTabs";
import { useToast } from "@/hooks/useToast";
import { DualToneLayout } from "@/layout/DualToneLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export const TemplateListPageContext = createContext<{ readOnly: boolean; spaceId: string }>({ readOnly: false, spaceId: "" });

export function TemplateListPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const locationState = useLocation().state as { readOnly?: boolean };
  const isReadOnly = useRef(false);
  if (locationState) {
    if (locationState.readOnly) isReadOnly.current = true;
  }

  const { data: templates } = useGetDefaultTemplateList();
  const { spaceId } = useRequiredParams<{ spaceId: string }>();

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

  const Info = (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin: 0 -2rem;
        padding: 1.2rem 2rem;
        background-color: #edf0f4;
      `}
    >
      <Icon icon={"ic_info"} color={DESIGN_SYSTEM_COLOR.grey500} />
      <Typography color={"gray600"} variant={"body14Medium"}>
        카드를 클릭하면 자세한 내용을 확인할 수 있어요
      </Typography>
    </div>
  );

  useEffect(() => {
    if (Object.is(parseInt(spaceId), NaN)) {
      toast.error("스페이스를 찾지 못했어요");
      navigate("/");
      return;
    }
  }, [spaceId]);

  return (
    <TemplateListPageContext.Provider value={{ readOnly: isReadOnly.current, spaceId }}>
      <DualToneLayout TopComp={TemplateListTabs} title="회고 템플릿 리스트">
        {Info}
        <ul
          css={css`
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-top: 2rem;
            padding-bottom: 2rem;
          `}
        >
          {
            {
              기본: (
                <>
                  {templates.map((template) => (
                    <DefaultTemplateListItem
                      key={template.id}
                      id={template.id}
                      title={template.title}
                      tag={template.templateName}
                      imageUrl={template.imageUrl}
                    />
                  ))}
                </>
              ),
              커스텀: <CustomTemplateList readOnly={isReadOnly.current} />,
            }[curTab]
          }
        </ul>
      </DualToneLayout>
    </TemplateListPageContext.Provider>
  );
}
