import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateRes } from "@/types/template";

export const useGetCustomTemplate = (formId: number) => {
  const getCustomTemplate = async (): Promise<CustomTemplateRes> => {
    const res = await api.get(`/form/${formId}`);
    return res.data as CustomTemplateRes;
  };

  return useSuspenseQuery({
    queryKey: ["customTemplate", formId],
    queryFn: getCustomTemplate,
  });
};
