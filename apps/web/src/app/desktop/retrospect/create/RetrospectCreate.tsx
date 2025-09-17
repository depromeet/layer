import { useState } from "react";
import { ConfirmDefaultTemplate } from "./step/ConfirmDefaultTemplate";
import MainInfo from "./step/MainInfo";
import { ProgressBar } from "@/component/common/ProgressBar";
import { css } from "@emotion/react";
import DueDate from "./step/DueDate";

export function RetrospectCreatePage() {
  const [step, setStep] = useState(0);

  /* 템플릿 변경 및 진행 */
  const handleConfirmTemplateChange = () => {
    setStep((prevStep) => prevStep + 1);
  };

  /* 회고 이름, 한 줄 설명*/
  const handleBackToMainInfo = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleMainInfo = () => {
    setStep((prevStep) => prevStep + 1);
  };

  /* 회고 마감일 */
  const handleBackToDueDate = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleDueDate = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        overflow-y: auto;
      `}
    >
      <ProgressBar curPage={step + 1} lastPage={3} />
      {step === 0 ? <ConfirmDefaultTemplate onNext={handleConfirmTemplateChange} /> : null}
      {step === 1 ? <MainInfo onPrev={handleBackToMainInfo} onNext={handleMainInfo} /> : null}
      {step === 2 ? <DueDate onPrev={handleBackToDueDate} onNext={handleDueDate} /> : null}
    </form>
  );
}
