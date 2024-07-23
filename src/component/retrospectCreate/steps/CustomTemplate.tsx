import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { FullModal } from "@/component/common/Modal/FullModal";
import { ConfirmEditTemplate, EditQuestions } from "@/component/retrospectCreate/questionsList";
import { ConfirmDefaultTemplate } from "@/component/retrospectCreate/questionsList/ConfirmDefaultTemplate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";

export function CustomTemplate() {
  const retroContext = useContext(RetrospectCreateContext);
  const { currentStep, goNext, goPrev } = useMultiStepForm({ steps: ["confirmDefaultTemplate", "editQuestions", "confirmTemplate"] as const });

  return (
    <>
      {currentStep === "confirmDefaultTemplate" && <ConfirmDefaultTemplate goEdit={goNext} />}
      {currentStep === "editQuestions" && (
        <FullModal>
          <EditQuestions goNext={goNext} goPrev={goPrev} />
        </FullModal>
      )}
      {currentStep === "confirmTemplate" && (
        <FullModal>
          <ConfirmEditTemplate goNext={retroContext.goNext} goPrev={goPrev} />
        </FullModal>
      )}
    </>
  );
}
