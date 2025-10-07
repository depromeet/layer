import { useTabs } from "@/hooks/useTabs";
import { TemplateListTabButton } from "../TemplateListTab/TemplateListTabButton";
import { useGetTemplateInfo } from "@/hooks/api/template/useGetTemplateInfo";
import { splitTemplateIntroduction } from "@/utils/retrospect/splitTemplateIntroduction";
import { TemplateBasicInfo } from "./TemplateBasicInfo";
import { TemplateListTab } from "../TemplateListTab";
import TemplatePurposeInfo from "./TemplatePurposeInfo";
import TemplateTipInfo from "./TemplateTipInfo";
import { ButtonProvider } from "@/component/common/button";

function TemplateListDetailItem({ templateId }: { templateId: number }) {
  const { tabs, curTab, selectTab } = useTabs(["기본", "질문구성"] as const);
  const { data } = useGetTemplateInfo({ templateId: templateId });
  const { heading, description } = splitTemplateIntroduction(data.introduction);

  return (
    <>
      {/* ---------- 탭 UI ---------- */}
      <TemplateListTab tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TemplateListTabButton} />

      {/* ---------- 기본 정보 UI ---------- */}
      <TemplateBasicInfo templateId={templateId} heading={heading} description={description} imageUrl={data.templateImageUrl} />

      {/* ---------- 목적 설명 UI  ---------- */}
      <TemplatePurposeInfo templatePurposeResponseList={data.templatePurposeResponseList} />

      {/* ---------- 팁 설명 UI  ---------- */}
      <TemplateTipInfo tipTitle={data.tipTitle} tipDescription={data.tipDescription} />

      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Primary>선택하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}

export default TemplateListDetailItem;
