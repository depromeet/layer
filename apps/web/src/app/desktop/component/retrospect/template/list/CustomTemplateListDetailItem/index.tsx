import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { ButtonProvider } from "@/component/common/button";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { TemplateQuestion } from "../TemplateListDetailItem/TemplateQuestion";
import { RetrospectCreate } from "@/app/desktop/component/retrospectCreate";

function CustomTemplateListDetailItem({ templateId }: { templateId: number }) {
  const { data } = useGetCustomTemplate(templateId);
  const transformedData = {
    ...data,
    questions: data.questions.map((q, index) => ({
      question: q.questionContent,
      description: "",
      questionId: index + 1,
    })),
  };
  const { openFunnelModal } = useFunnelModal();
  const setRetrospectValue = useSetAtom(retrospectInitialState);

  const handleSelectTemplate = () => {
    console.log("templateId", templateId);
    setRetrospectValue((prev) => ({
      ...prev,
      templateId: String(templateId),
      saveTemplateId: true,
    }));

    openFunnelModal({
      title: "",
      step: "retrospectCreate",
      contents: <RetrospectCreate />,
    });
  };

  return (
    <>
      <TemplateQuestion templateId={templateId} templateDetailQuestionList={transformedData.questions} />

      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Primary onClick={handleSelectTemplate}>선택하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}

export default CustomTemplateListDetailItem;
