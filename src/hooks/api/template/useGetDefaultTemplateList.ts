import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { TemplatesRes } from "@/types/template";

export const useGetDefaultTemplateList = () => {
  const getDefaultTemplateList = async () => {
    const { data } = await api.get<TemplatesRes>(`/api/template/all`);
    return data;
  };

  return useSuspenseQuery({
    queryKey: ["getDefaultTemplates"],
    queryFn: getDefaultTemplateList,
  });
};
