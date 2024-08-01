import { useAtom } from "jotai";
import { useContext, useEffect } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { FullModal } from "@/component/common/Modal/FullModal";
import { ConfirmEditTemplate, EditQuestions, ConfirmDefaultTemplate } from "@/component/retrospectCreate";
// import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { isQuestionEditedAtom, retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { Questions } from "@/types/retrospectCreate";

type CustomTemplateProps = {
  templateId: number;
};

const DUMMY_QUESTIONS: Questions = [
  { questionType: "plain_text", questionContent: "계속 유지하고 싶은 것은 무엇인가요?" },
  {
    questionType: "plain_text",
    questionContent: "어려움을 느꼈던 부분은 무엇인가요?",
  },
  {
    questionType: "plain_text",
    questionContent: "새롭게 시도해볼 내용은 무엇인가요?",
  },
];

export function CustomTemplate({ templateId }: CustomTemplateProps) {
  // const {
  //   data: { title, questions },
  // } = useGetCustomTemplate(templateId);
  const retroContext = useContext(RetrospectCreateContext);
  const { currentStep, goNext, goPrev, goTo } = useMultiStepForm({
    steps: ["confirmDefaultTemplate", "editQuestions", "confirmEditTemplate"] as const,
  });
  const [isQuestionEdited, _] = useAtom(isQuestionEditedAtom);
  const [, setRetroCreateData] = useAtom(retrospectCreateAtom);

  useEffect(() => {
    console.log(templateId); //FIXME - prevent temporarily unused variable
    if (isQuestionEdited) {
      goTo("confirmEditTemplate");
    }
    // setRetroCreateData((prev) => ({...prev, questions}))
    setRetroCreateData((prev) => ({
      ...prev,
      questions: DUMMY_QUESTIONS,
    }));
  }, []);

  return (
    <>
      {currentStep === "confirmDefaultTemplate" && <ConfirmDefaultTemplate title={"임시 타이틀"} goEdit={goNext} />}
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
    </>
  );
}
