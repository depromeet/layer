import { useState } from "react";

import { patterns } from "@/component/common/input/patterns.const";

type UseValidation = {
  validations?: (keyof typeof patterns)[];
  maxLength?: number;
};

export const useValidation = <T extends HTMLInputElement | HTMLTextAreaElement>({ validations, maxLength }: UseValidation) => {
  const [errorMsg, setErrorMsg] = useState<string>();

  const onInputValidate = (e: React.ChangeEvent<T>) => {
    if (maxLength) {
      if (e.target.value.length > maxLength) {
        setErrorMsg(`최대 ${maxLength}자까지 입력이 가능해요`);
        return;
      } else {
        setErrorMsg("");
      }
    }
    if (!validations) return;
    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const pattern = new RegExp(patterns[validation]["pattern"], "g");
      const isValid = pattern.test(e.target.value);
      if (isValid) {
        setErrorMsg(undefined);
        return;
      } else {
        setErrorMsg(patterns[validation]["errorMsg"]);
        return;
      }
    }
  };

  return {
    errorMsg,
    onInputValidate,
  };
};
