import { useState } from "react";
import { ConfirmDefaultTemplate } from "./step/ConfirmDefaultTemplate";
import MainInfo from "./step/MainInfo";
import { ProgressBar } from "@/component/common/ProgressBar";

export function RetrospectCreatePage() {
  const [step, setStep] = useState(1);

  return (
    <>
      <ProgressBar curPage={step} lastPage={3} />
      {step === 1 ? <ConfirmDefaultTemplate /> : null}
      {step === 2 ? <MainInfo /> : null}
    </>
  );
}
