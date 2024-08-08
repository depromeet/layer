import { useCallback, useState } from "react";

export const useInput = <T extends HTMLInputElement | HTMLTextAreaElement>(defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleInputChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  const resetInput = useCallback(() => {
    setValue("");
  }, []);

  return { value, handleInputChange, resetInput };
};
