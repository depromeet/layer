import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateListRes } from "@/types/template";

export const useGetCustomTemplateList = (spaceId: number) => {
  const getCustomTemplateList = async (page: number) => {
    const { data } = await api.get<CustomTemplateListRes>(`/form/space/${spaceId}/custom-template`, {
      params: {
        page,
        size: 5,
      },
    });
    return data;
  };

  return useSuspenseInfiniteQuery<CustomTemplateListRes["customTemplateList"]>({
    queryKey: ["getCustomTemplateList", spaceId],
    queryFn: ({ pageParam }) => getCustomTemplateList(pageParam as number).then((res) => res.customTemplateList),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.pageable.pageNumber + 1),
  });
};
