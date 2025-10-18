import { RetrospectWriteType } from "@/types/write";
import { atom } from "jotai";

export const retrospectWriteAtom = atom<RetrospectWriteType>({
  spaceId: -1,
  retrospectId: -1,
  title: "",
  introduction: "",
});
