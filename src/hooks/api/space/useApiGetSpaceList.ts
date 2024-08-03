import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import { api } from "@/api";
import { Space } from "@/types/spaceType";

type SpaceFetchResponse = {
  data: Space[];
  meta: {
    hasNextPage: boolean;
    cursor: number;
  };
};

export const spaceFetch = async (cursorId: number, category: string, pageSize: number) => {
  const params = category !== "ALL" ? { cursorId: cursorId, category: category, pageSize: pageSize } : { cursorId: cursorId, pageSize: pageSize };

  const response = await api.get<SpaceFetchResponse>("/api/space/list", {
    params: params,
  });
  return response.data;
};

export const useApiGetSpaceList = (selectedView: string) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<SpaceFetchResponse>({
    queryKey: ["spaces", selectedView],
    queryFn: ({ queryKey, pageParam = 0 }) => {
      const [, category] = queryKey;
      return spaceFetch(pageParam as number, category as string, 5);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.meta.hasNextPage ? lastPage.meta.cursor : undefined),
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          await fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return {
    data,
    lastElementRef,
  };
};
