import { useAtom, useAtomValue } from "jotai";
import { createContext, useContext, useEffect } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { FullModal } from "@/component/common/Modal/FullModal";
import { ConfirmEditTemplate, EditQuestions, ConfirmDefaultTemplate } from "@/component/retrospectCreate";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { isQuestionEditedAtom, retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { CustomTemplateRes } from "@/types/template";

type CustomTemplateProps = {
  templateId: number;
};

const DUMMY_FORMNAME = "디프만님의 커스텀 회고";

export const TemplateContext = createContext<CustomTemplateRes>({
  title: "",
  tags: [],
  questions: [],
});

export function CustomTemplate({ templateId }: CustomTemplateProps) {
  const {
    data: { title, tags, questions },
  } = useGetCustomTemplate(templateId);
  const retroContext = useContext(RetrospectCreateContext);
  const { currentStep, goNext, goPrev, goTo } = useMultiStepForm({
    steps: ["confirmDefaultTemplate", "editQuestions", "confirmEditTemplate"] as const,
  });
  const isQuestionEdited = useAtomValue(isQuestionEditedAtom);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);

  useEffect(() => {
    if (isQuestionEdited) {
      goTo("confirmEditTemplate");
    }
  }, []);

  useEffect(() => {
    if (retroCreateData.questions.length > 0) return;
    setRetroCreateData((prev) => ({ ...prev, questions }));
  }, []);

  return (
    <TemplateContext.Provider value={{ title: DUMMY_FORMNAME, tags, questions }}>
      {currentStep === "confirmDefaultTemplate" && <ConfirmDefaultTemplate title={title} goEdit={goNext} />}
      {currentStep === "editQuestions" && (
        <FullModal>
          <EditQuestions
            goNext={goNext}
            goPrev={() => {
              if (!isQuestionEdited) {
                goPrev();
              } else {
                goTo("confirmEditTemplate");
              }
            }}
          />
        </FullModal>
      )}
      {currentStep === "confirmEditTemplate" && (
        <FullModal>
          <ConfirmEditTemplate goNext={retroContext.goNext} goPrev={goPrev} />
        </FullModal>
      )}
    </TemplateContext.Provider>
  );
}
