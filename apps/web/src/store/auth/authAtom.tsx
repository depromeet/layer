import { atomWithStorage } from "jotai/utils";

type Auth = {
  isLogin: boolean;
  name: string;
  email: string;
  memberRole: string;
  imageUrl: string;
};

export const authAtom = atomWithStorage<Auth>("auth", {
  isLogin: false,
  name: "",
  email: "",
  memberRole: "",
  imageUrl: "",
});
