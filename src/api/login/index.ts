import { api } from "@/api";
import { MemberInfo } from "@/types/loginType";

export const fetchMemberInfo = async (): Promise<MemberInfo> => {
  const response = await api.get<MemberInfo>("/api/auth/member-info");
  return response.data;
};
