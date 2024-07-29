import { atom } from "jotai";

import { MainInfo, Questions } from "@/types/retrospectCreate";

//FIXME - 선택된 템플릿에 해당하는 질문들이어야 함.
export const questionsAtom = atom<Questions>([
  "계속 유지하고 싶은 것은 무엇인가요?",
  "어려움을 느꼈던 부분은 무엇인가요?",
  "새롭게 시도해볼 내용은 무엇인가요?",
]);

export const isQuestionEditedAtom = atom<boolean>(false);

export const mainInfoAtom = atom<MainInfo>({
  title: "",
  introduction: "",
});

export const dueDateAtom = atom<{ date: Date; time: string }>({
  date: new Date(),
  time: "",
});
