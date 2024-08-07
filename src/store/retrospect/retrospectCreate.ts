import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { RetrospectCreateReq } from "@/types/retrospectCreate";

export const isQuestionEditedAtom = atom<boolean>(false);

export const retrospectCreateAtom = atomWithReset<RetrospectCreateReq>({
  title: "",
  introduction: "",
  questions: [],
  deadline: new Date().toISOString(),
  isNewForm: false,
});
