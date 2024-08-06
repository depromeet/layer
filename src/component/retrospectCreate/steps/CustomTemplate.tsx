import { useAtom, useAtomValue } from "jotai";
import { createContext, useContext, useEffect } from "react";
// import { useLocation } from "react-router-dom";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { FullModal } from "@/component/common/Modal/FullModal";
import { ConfirmEditTemplate, EditQuestions, ConfirmDefaultTemplate } from "@/component/retrospectCreate";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { isQuestionEditedAtom, retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { CustomTemplateRes } from "@/types/template";

export const TemplateContext = createContext<CustomTemplateRes>({
  title: "",
  tag: "",
  questions: [],
});

export function CustomTemplate() {
  // const locationState = useLocation().state as { templateId: number };
  // const { templateId } = locationState;
  const {
    data: { title, tag, questions },
  } = useGetCustomTemplate(10001); //FIXME - dummy template id
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
    <TemplateContext.Provider value={{ title, tag, questions }}>
      {currentStep === "confirmDefaultTemplate" && <ConfirmDefaultTemplate goEdit={goNext} />}
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
      {currentStep === "confirmEditTemplate" && <ConfirmEditTemplate goNext={retroContext.goNext} goPrev={goPrev} />}
    </TemplateContext.Provider>
  );
}
