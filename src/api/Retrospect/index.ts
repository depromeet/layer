import { api } from "@/api";
import { Space } from "@/types/spaceType";

type SpaceFetchResponse = {
  data: Space[];
  meta: {
    nextCursorId: number;
    hasNextPage: boolean;
  };
};

// 스페이스 정보 획득 함수
export const spaceFetch = async (
  cursorId: number,
  category: string,
  pageSize: number,
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>,
  setCursorId: React.Dispatch<React.SetStateAction<number>>,
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const response = await api.get<SpaceFetchResponse>("/api/space/list", {
    params: {
      cursorId: cursorId,
      category: category,
      pageSize: pageSize,
    },
  });
  setSpaces((prevSpaces) => [...prevSpaces, ...response.data.data]);
  setCursorId(response.data.meta.nextCursorId);
  setHasNextPage(response.data.meta.hasNextPage);
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
