import { api } from "@/api";
import { Space } from "@/types/spaceType";

type ApiResponse = {
  data: Space[];
  meta: {
    nextCursorId: number;
    hasNextPage: boolean;
  };
};

export const spaceFetch = async (
  cursorId: number,
  category: string,
  pageSize: number,
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>,
  setCursorId: React.Dispatch<React.SetStateAction<number>>,
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await api.get<ApiResponse>("/api/space/list", {
      params: {
        cursorId: cursorId,
        category: category,
        pageSize: pageSize,
      },
    });
    console.log(response);
    setSpaces((prevSpaces) => [...prevSpaces, ...response.data.data]);
    setCursorId(response.data.meta.nextCursorId);
    setHasNextPage(response.data.meta.hasNextPage);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
