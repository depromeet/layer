import { useState } from "react";
import { ConfirmDefaultTemplate } from "./step/ConfirmDefaultTemplate";
import MainInfo from "./step/MainInfo";
import { ProgressBar } from "@/component/common/ProgressBar";
import { css } from "@emotion/react";

export function RetrospectCreatePage() {
  const [step, setStep] = useState(2);

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        overflow-y: auto;
      `}
    >
      <ProgressBar curPage={step} lastPage={3} />
      {step === 1 ? <ConfirmDefaultTemplate /> : null}
      {step === 2 ? <MainInfo /> : null}
    </form>
  );
}
