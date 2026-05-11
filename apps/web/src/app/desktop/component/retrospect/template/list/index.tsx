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
import { trackEvent } from "@/lib/google-analytics";
import { GA_EVENTS } from "@/lib/google-analytics/events";
import { useAtomValue } from "jotai";
import { branchLayoutAtom } from "@/store/auth/authAtom";
import { Button } from "@/component/common/button";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { TemplateRecommend } from "../recommend";

export const TemplateListPageContext = createContext<{
  spaceId: string;
  isLeader: boolean;
}>({
  spaceId: "",
  isLeader: false,
});

function InfoBanner() {
  return (
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
  );
}

// B안) 템플릿 추천 배너
function RecommendBanner({ onClickRecommend }: { onClickRecommend: () => void }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 1.6rem 1.8rem 1.6rem 1.6rem;
        border-radius: 0.8rem;
        gap: 0.8rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 1.2rem;
        `}
      >
        <Icon
          icon="ic_stars"
          size={2.2}
          css={css`
            flex-shrink: 0;
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.2rem;
          `}
        >
          <Typography variant="subtitle14Bold" color={"gray800"}>
            회고 템플릿 추천
          </Typography>
          <Typography variant="body12SemiBold" color={"gray700"}>
            어울리는 회고 템플릿이 궁금하다면 맞춤 추천을 받아보세요
          </Typography>
        </div>
      </div>
      <Button
        css={css`
          background: ${DESIGN_TOKEN_COLOR.gray200};
          width: fit-content;
          height: auto;
          flex-shrink: 0;
          padding: 0.8rem 2rem;
          border-radius: 0.8rem;
        `}
        onClick={onClickRecommend}
      >
        <Typography variant="body12Strong">추천 받기</Typography>
      </Button>
    </div>
  );
}

export function TemplateList() {
  const { toast } = useToast();
  const isLeader = useRef(false);
  const params = useRequiredParams<{ spaceId?: string }>();
  const [searchParams] = useSearchParams();
  const spaceId = params.spaceId || searchParams.get("spaceId") || "";
  const branchLayout = useAtomValue(branchLayoutAtom);
  const { openFunnelModal } = useFunnelModal();

  const { data: templates } = useGetDefaultTemplateList();

  // * @see AddSpacePage.tsx - 첫 스페이스와 회고 생성시에 템플릿 선택 화면으로 이동할 때 URL 파라미터로 타입을 넘겨줘요
  const type = searchParams.get("template_type") || "";
  const isInitialCreateRetrospect = type === "new_space";

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

  // 템플릿 리스트 퍼널 진입 시 GA 이벤트를 전송해요
  useEffect(() => {
    trackEvent(GA_EVENTS.RETROSPECT.FUNNEL_VIEW_LIST);
  }, []);

  const handleClickRecommend = () => {
    openFunnelModal({
      title: "",
      step: "recommendTemplate",
      contents: <TemplateRecommend />,
    });
  };

  return (
    <>
      {/* ---------- 템플릿 탭 UI ---------- */}
      {/* 스페이스 신규 생성일 경우에는 선택(기본 및 커스텀) 탭을 노출시키지 않는다. */}
      {!isInitialCreateRetrospect && <TemplateListTab tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TemplateListTabButton} />}

      {/* ---------- 템플릿 카드 리스트 UI ---------- */}
      <div
        css={css`
          margin-top: 2rem;
        `}
      >
        <TemplateListPageContext.Provider value={{ spaceId, isLeader: isLeader.current }}>
          {branchLayout === "A" ? <InfoBanner /> : <RecommendBanner onClickRecommend={handleClickRecommend} />}
          <ul
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.2rem;
              margin-top: ${branchLayout === "A" ? "2rem" : "1.2rem"};
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
