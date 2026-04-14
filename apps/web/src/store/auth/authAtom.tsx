import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Auth = {
  isLogin: boolean;
  name: string;
  email: string;
  memberRole: string;
  imageUrl: string;
  memberSeq: number | null;
};

export const authAtom = atomWithStorage<Auth>("auth", {
  isLogin: false,
  name: "",
  email: "",
  memberRole: "",
  imageUrl: "",
  memberSeq: null,
});

// 로그인 시에 할당되는 A/B 테스트의 사용자 그룹 소속 데이터
export const branchLayoutAtom = atom((get) => {
  const { memberSeq } = get(authAtom);
  return memberSeq ? (memberSeq % 2 === 0 ? "A" : "B") : "B";
});
