import { useAtom, useAtomValue } from "jotai";
import { createContext, useContext, useEffect } from "react";
// import { useLocation } from "react-router-dom";

import { CustomTemplateContext, RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { FullModal } from "@/component/common/Modal/FullModal";
import { ConfirmEditTemplate, EditQuestions, ConfirmDefaultTemplate } from "@/component/retrospectCreate";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
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
  const pageContext = useContext(RetrospectCreateContext);
  const customContext = useContext(CustomTemplateContext);

  const isQuestionEdited = useAtomValue(isQuestionEditedAtom);
  const [retroCreateData, setRetroCreateData] = useAtom(retrospectCreateAtom);

  useEffect(() => {
    if (isQuestionEdited) {
      customContext.goTo("confirmEditTemplate");
    }
  }, []);

  useEffect(() => {
    if (retroCreateData.questions.length > 0) return;
    setRetroCreateData((prev) => ({ ...prev, questions }));
  }, []);

  return (
    <TemplateContext.Provider value={{ title, tag, questions }}>
      {customContext.currentStep === "confirmDefaultTemplate" && <ConfirmDefaultTemplate goEdit={customContext.goNext} />}
      {customContext.currentStep === "editQuestions" && (
        <FullModal>
          <EditQuestions
            goNext={customContext.goNext}
            goPrev={() => {
              if (!isQuestionEdited) {
                customContext.goPrev();
              } else {
                customContext.goTo("confirmEditTemplate");
              }
            }}
          />
        </FullModal>
      )}
      {customContext.currentStep === "confirmEditTemplate" && <ConfirmEditTemplate goNext={pageContext.goNext} goPrev={customContext.goPrev} />}
    </TemplateContext.Provider>
  );
}
