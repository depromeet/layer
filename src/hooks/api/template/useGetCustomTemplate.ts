import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateRes } from "@/types/template";

export const useGetCustomTemplate = (formId: number) => {
  const getCustomTemplate = async (): Promise<CustomTemplateRes> => {
    const { data } = await api.get<CustomTemplateRes>(`/form/${formId}`);
    return data;
  };

  return useSuspenseQuery({
    queryKey: ["customTemplate", formId],
    queryFn: getCustomTemplate,
  });
};
