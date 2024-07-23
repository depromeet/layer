import { atom } from "jotai";

type Auth = {
  isLogin: boolean;
  name: string;
  email: string;
  memberRole: string;
};

export const authAtom = atom<Auth>({
  isLogin: false,
  name: "",
  email: "",
  memberRole: "",
});
