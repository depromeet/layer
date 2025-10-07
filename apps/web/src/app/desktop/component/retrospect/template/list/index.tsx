import { useRequiredParams } from "@/hooks/useRequiredParams";
import { useTabs } from "@/hooks/useTabs";
import { useToast } from "@/hooks/useToast";
import { css } from "@emotion/react";
import { createContext, useEffect, useRef } from "react";
import { TemplateListTabs } from "./TemplateListTabs";
import { TemplateListTabButton } from "./TemplateListTabButton";
import { CustomTemplateList } from "@/component/retrospect/template/list";
import { DesktopTemplateListItem } from "./DesktopTemplateListItem";
import { useGetDefaultTemplateList } from "@/hooks/api/template/useGetDefaultTemplateList";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { formatTitle } from "@/utils/retrospect/formatTitle";

export const TemplateListPageContext = createContext<{ readOnly: boolean; spaceId: string; isLeader: boolean }>({
  readOnly: false,
  spaceId: "",
  isLeader: false,
});

export function TemplateList() {
  const { toast } = useToast();
  const isReadOnly = useRef(false);
  const isLeader = useRef(false);
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  const { data: templates } = useGetDefaultTemplateList();

  const { tabs, curTab, selectTab } = useTabs(["기본", "커스텀"] as const);

  useEffect(() => {
    if (Object.is(parseInt(spaceId), NaN)) {
      toast.error("스페이스를 찾지 못했어요");
      return;
    }
  }, [spaceId]);

  return (
    <>
      {/* ---------- 템플릿 탭 UI ---------- */}
      <TemplateListTabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TemplateListTabButton} />

      {/* ---------- 템플릿 카드 리스트 UI ---------- */}
      <div
        css={css`
          margin-top: 0.8rem;
        `}
      >
        <TemplateListPageContext.Provider value={{ readOnly: isReadOnly.current, spaceId, isLeader: isLeader.current }}>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.8rem;
              padding: 0.8rem 1.2rem;
              background-color: #edf0f4;
              border-radius: 0.8rem;
            `}
          >
            <Icon icon={"ic_info"} color={DESIGN_SYSTEM_COLOR.grey500} />
            <Typography color={"gray600"} variant={"body12SemiBold"}>
              카드를 클릭하면 자세한 내용을 확인할 수 있어요
            </Typography>
          </div>

          {/* ---------- 템플릿 카드 리스트 UI  ---------- */}
          <ul
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.2rem;
              margin-top: 2rem;

              // TODO 카드 리스트 반응형 대응을 해야할지..?
            `}
          >
            {
              {
                기본: (
                  <>
                    {templates.map((template) => (
                      <DesktopTemplateListItem
                        key={template.id}
                        id={template.id}
                        title={formatTitle(template.title, template.id)}
                        tag={template.templateName}
                        imageUrl={template.imageUrl}
                      />
                    ))}
                  </>
                ),
                커스텀: <CustomTemplateList />,
              }[curTab]
            }
          </ul>
        </TemplateListPageContext.Provider>
      </div>
    </>
  );
}
