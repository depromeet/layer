import { useCallback, useState } from "react";

type UseInputReturn = [string, (e: React.ChangeEvent<HTMLInputElement>) => void];

export const useInput = (defaultValue?: string): UseInputReturn => {
  const [value, setValue] = useState(defaultValue || "");

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, handleInputChange];
};
