import { api } from "@/api";
import { Space } from "@/types/spaceType";

type SpaceFetchResponse = {
  data: Space[];
  meta: {
    hasNextPage: boolean;
    cursor: number;
  };
};

// 스페이스 정보 획득 함수
export const spaceFetch = async (cursorId: number, category: string, pageSize: number) => {
  const params = category !== "ALL" ? { cursorId: cursorId, category: category, pageSize: pageSize } : { cursorId: cursorId, pageSize: pageSize };

  const response = await api.get<SpaceFetchResponse>("/api/space/list", {
    params: params,
  });
  return response.data;
};

type RestrospectResponse = {
  layerCount: number;
  retrospects: [
    {
      retrospectId: number;
      title: string;
      introduction: string;
      isWrite: boolean;
      retrospectStatus: string;
      writeCount: number;
      totalCount: number;
    },
  ];
};

// space에 있는 회고록 획득 함수
export const spaceRestrospectFetch = async (spaceId: number) => {
  const response = await api.get<RestrospectResponse>(`/space/${spaceId}/retrospect`);
  console.log(response);
};
