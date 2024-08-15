import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { MemberInfo } from "@/types/loginType";

export const useApiGetUser = () => {
  const getUser = async (): Promise<MemberInfo> => {
    const res = await api.get<MemberInfo>(`/api/auth/member-info`);
    return res.data;
  };

  return useSuspenseQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
};
