import { useCallback, useState } from "react";

export const useInput = (defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return { value, handleInputChange };
};
