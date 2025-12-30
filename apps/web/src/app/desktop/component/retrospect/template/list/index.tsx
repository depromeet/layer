import { useRequiredParams } from "@/hooks/useRequiredParams";
import { useTabs } from "@/hooks/useTabs";
import { useToast } from "@/hooks/useToast";
import { css } from "@emotion/react";
import { createContext, useEffect, useRef } from "react";
import { TemplateListTabButton } from "./TemplateListTab/TemplateListTabButton";
import { CustomTemplateList } from "@/component/retrospect/template/list";
import { useGetDefaultTemplateList } from "@/hooks/api/template/useGetDefaultTemplateList";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { formatTitle } from "@/utils/retrospect/formatTitle";
import { TemplateListItem } from "./TemplateListItem";
import { TemplateListTab } from "./TemplateListTab";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useSearchParams } from "react-router-dom";

export const TemplateListPageContext = createContext<{
  spaceId: string;
  isLeader: boolean;
}>({
  spaceId: "",
  isLeader: false,
});

export function TemplateList() {
  const { toast } = useToast();
  const isLeader = useRef(false);
  const params = useRequiredParams<{ spaceId?: string }>();
  const [searchParams] = useSearchParams();
  const spaceId = params.spaceId || searchParams.get("spaceId") || "";

  const { data: templates } = useGetDefaultTemplateList();

  // * @see AddSpacePage.tsx - 첫 스페이스와 회고 생성시에 템플릿 선택 화면으로 이동할 때 URL 파라미터로 타입을 넘겨줘요
  const type = searchParams.get("template_type") || "";
  const DEFAULT_TAB = ["기본", "커스텀"] as const;

  const { tabs, curTab, selectTab } = useTabs(DEFAULT_TAB);

  useEffect(() => {
    if (type === "retrospect_create") {
      if (Object.is(parseInt(spaceId), NaN)) {
        toast.error("스페이스를 찾지 못했어요");
        return;
      }
    }
  }, [spaceId]);

  return (
    <>
      {/* ---------- 템플릿 탭 UI ---------- */}
      <TemplateListTab tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TemplateListTabButton} />

      {/* ---------- 템플릿 카드 리스트 UI ---------- */}
      <div
        css={css`
          margin-top: 0.8rem;
        `}
      >
        <TemplateListPageContext.Provider value={{ spaceId, isLeader: isLeader.current }}>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.8rem;
              padding: 0.8rem 1.2rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray200};
              border-radius: 0.8rem;
            `}
          >
            <Icon icon={"ic_info"} color={DESIGN_SYSTEM_COLOR.grey500} />
            <Typography color={"gray600"} variant={"body12SemiBold"}>
              카드를 클릭하면 자세한 내용을 확인할 수 있어요
            </Typography>
          </div>
          <ul
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.2rem;
              margin-top: 2rem;
              padding-bottom: 2.4rem;
            `}
          >
            {
              {
                기본: (
                  <>
                    {templates.map((template) => (
                      <TemplateListItem
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
