import { useTabs } from "@/hooks/useTabs";
import { TemplateListTabButton } from "../TemplateListTab/TemplateListTabButton";
import { useGetTemplateInfo } from "@/hooks/api/template/useGetTemplateInfo";
import { splitTemplateIntroduction } from "@/utils/retrospect/splitTemplateIntroduction";
import { TemplateBasic } from "./TemplateBasic";
import { TemplateListTab } from "../TemplateListTab";
import { TemplatePurpose } from "./TemplatePurpose";
import { TemplateTip } from "./TemplateTip";
import { ButtonProvider } from "@/component/common/button";
import { TemplateQuestion } from "./TemplateQuestion";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { TemplateListConform } from "../TemplateListConform";

function TemplateListDetailItem({ templateId }: { templateId: number }) {
  const { tabs, curTab, selectTab } = useTabs(["기본", "질문구성"] as const);
  const { data } = useGetTemplateInfo({ templateId: templateId });
  const { heading, description } = splitTemplateIntroduction(data.introduction);
  const { openFunnelModal } = useFunnelModal();
  const setRetrospectValue = useSetAtom(retrospectInitialState);

  const handleSelectTelplate = () => {
    setRetrospectValue((prev) => ({
      ...prev,
      tempTemplateId: String(templateId),
      saveTemplateId: true,
    }));

    openFunnelModal({
      title: "",
      step: "recommendTemplate",
      contents: <TemplateListConform />,
    });
  };

  return (
    <>
      {/* ---------- 탭 UI ---------- */}
      <TemplateListTab tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TemplateListTabButton} />

      {/* ---------- 회고 기본 정보 UI ---------- */}
      <TemplateBasic templateId={templateId} heading={heading} description={description} imageUrl={data.templateImageUrl} />

      {/* ---------- 회고 작성 목적 설명 UI  ---------- */}
      <TemplatePurpose templatePurposeResponseList={data.templatePurposeResponseList} />

      {/* ---------- 회고 작성 팁 설명 UI  ---------- */}
      <TemplateTip tipTitle={data.tipTitle} tipDescription={data.tipDescription} />

      {/* ---------- 질문 구성 UI  ---------- */}
      <TemplateQuestion templateId={templateId} templateDetailQuestionList={data.templateDetailQuestionList} />

      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Primary onClick={handleSelectTelplate}>선택하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}

export default TemplateListDetailItem;
