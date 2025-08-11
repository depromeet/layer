import { atomWithReset } from "jotai/utils";

import { ProjectType, SpaceValue } from "@/types/space";
import { atom } from "jotai";

const initialState = {
  category: ProjectType.Individual,
  field: [],
  name: "",
  introduction: "",
  imgUrl: "",
  step: 0,
  submit: false,
};

export const spaceState = atomWithReset<SpaceValue>(initialState);

// * 현재 선택된 스페이스 전역 상태
export const currentSpaceState = atom<SpaceValue | null>(null);
