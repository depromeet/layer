import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { Space } from "@/types/spaceType";

type SpaceFetchResponse = {
  data: Space[];
  meta: {
    hasNextPage: boolean;
    cursor: number;
  };
};

type UseApiGetSpaceListOptions = {
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 5;

export const spaceFetch = async (cursorId: number, category: string, pageSize: number) => {
  const params: { cursorId: number; pageSize: number; category?: string } = {
    cursorId,
    pageSize,
  };

  if (category !== "ALL") {
    params.category = category;
  }

  const response = await api.get<SpaceFetchResponse>("/api/space/list", {
    params,
  });
  return response.data;
};

export const useApiGetSpaceList = (category: string, options?: UseApiGetSpaceListOptions) => {
  const { pageSize = DEFAULT_PAGE_SIZE } = options || {};

  return useInfiniteQuery<SpaceFetchResponse>({
    queryKey: ["spaces", category],
    queryFn: ({ pageParam = 0 }) => {
      return spaceFetch(pageParam as number, category, pageSize);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.meta.hasNextPage ? lastPage.meta.cursor : undefined),
  });
};
