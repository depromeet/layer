import { atom } from "jotai";

import { RetrospectCreateReq } from "@/types/retrospectCreate";

export const isQuestionEditedAtom = atom<boolean>(false);

export const retrospectCreateAtom = atom<RetrospectCreateReq>({
  title: "",
  introduction: "",
  questions: [],
  deadline: new Date().toISOString(),
  isNewForm: false,
});
