import { atom } from "jotai";

import { RetrospectCreateReq } from "@/types/retrospectCreate";

//FIXME - 선택된 템플릿에 해당하는 질문들이어야 함.
export const questionsAtom = atom<string[]>([
  "계속 유지하고 싶은 것은 무엇인가요?",
  "어려움을 느꼈던 부분은 무엇인가요?",
  "새롭게 시도해볼 내용은 무엇인가요?",
]);

export const isQuestionEditedAtom = atom<boolean>(false);

export const retrospectCreateAtom = atom<RetrospectCreateReq>({
  title: "",
  introduction: "",
  questions: [],
  deadline: new Date().toISOString(),
  isNewForm: false,
  formName: "",
  formIntroduction: "",
});
