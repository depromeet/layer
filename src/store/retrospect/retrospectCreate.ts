import { atom } from "jotai";

import { MainInfo, Questions } from "@/types/retrospectCreate";

export const questionsAtom = atom<Questions>([
  "계속 유지하고 싶은 것은 무엇인가요?",
  "어려움을 느꼈던 부분은 무엇인가요?",
  "새롭게 시도해볼 내용은 무엇인가요?",
]);

export const mainInfoAtom = atom<MainInfo>({
  title: "",
  introduction: "",
});
