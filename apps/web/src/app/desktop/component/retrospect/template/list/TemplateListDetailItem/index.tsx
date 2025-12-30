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
import { useSearchParams } from "react-router-dom";

function TemplateListDetailItem({ templateId }: { templateId: number }) {
  const { tabs, curTab, selectTab } = useTabs(["기본", "질문구성"] as const);
  const { data } = useGetTemplateInfo({ templateId: templateId });
  const { heading, description } = splitTemplateIntroduction(data.introduction);
  const { openFunnelModal, closeFunnelModal } = useFunnelModal();
  const setRetrospectValue = useSetAtom(retrospectInitialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("template_type");
  const templateMode = searchParams.get("template_mode");

  /**
   * @description 회고 템플릿 선택하기 버튼 클릭 핸들러
   * - type 값이 "new_space"인 경우: 스페이스 생성 플로우에서 템플릿을 선택한 것이므로, 선택한 템플릿 ID를 URL 파라미터로 설정하고 퍼널 모달을 닫아요
   */
  const handleSelectTemplate = () => {
    if (type === "new_space") {
      setSearchParams({ selected_template_id: templateId.toString() });
      closeFunnelModal();
    } else {
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
    }
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

      {/* 읽기 전용(readOnly = true)일 경우에는 버튼 컨테이너를 노출시키지 않아요 */}
      {templateMode !== "readonly" && (
        <ButtonProvider sort={"horizontal"}>
          <ButtonProvider.Primary onClick={handleSelectTemplate}>선택하기</ButtonProvider.Primary>
        </ButtonProvider>
      )}
    </>
  );
}

export default TemplateListDetailItem;
