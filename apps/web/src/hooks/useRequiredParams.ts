import { useParams } from "react-router-dom";

export const useRequiredParams = <T extends Record<string, string>>() => {
  const params = useParams<T>();
  return params as T;
};
