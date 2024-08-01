import { useCallback, useState } from "react";

import { validations } from "@/component/common/input/validation.const";

export const useInput = <T extends HTMLInputElement | HTMLTextAreaElement>(defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleInputChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  const resetInput = useCallback(() => {
    setValue("");
  }, []);

  // const onInputValidate = (errorMsg: string) => {
  //   setError((prev) => ({ ...prev, errorMsg }));
  // };

  const onInputValidate = (e: React.ChangeEvent<HTMLInputElement>, reqType: keyof typeof validations) => {
    console.log("here");
    if (!e.target.value) return;

    let errorMsg = "";
    if (reqType === "EXCLUDE_SPECIAL_CHARS" && validations["EXCLUDE_SPECIAL_CHARS"].test(e.target.value)) {
      errorMsg = "특수문자는 입력이 불가해요";
    }
    setError((prev) => ({ ...prev, errorMsg }));

    // if (errorMsg) {
    //   setError((prev) => ({ ...prev, errorMsg }));
    // }
  };

  const [error, setError] = useState<{
    isRequired: boolean;
    reqType: keyof typeof validations;
    errorMsg: string;
    onInputValidate: typeof onInputValidate;
  }>({
    isRequired: false,
    reqType: "EXCLUDE_SPECIAL_CHARS",
    errorMsg: "",
    onInputValidate,
  });

  return { value, handleInputChange, resetInput, error, onInputValidate };
};
