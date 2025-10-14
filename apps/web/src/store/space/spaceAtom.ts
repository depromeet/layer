import { atomWithReset } from "jotai/utils";

import { ProjectType, SpaceValue } from "@/types/space";
import { atom } from "jotai";
import { Space } from "@/types/spaceType";

/**
 * 기존 모바일에서 사용하던 스페이스 생성 레거시 전역 상태
 * - spaceState로 export 되고 있어요
 */
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

/**
 * 새로운 리뉴얼 스페이스 생성 전역 상태
 * - createSpaceState로 export 되고 있어요
 *  */
const INITIAL_SPACE_STATE = {
  title: "",
  description: "",
  phase: 0,
  startDate: "",
  endDate: "",
  // TODO: @jae1n 여기에 필요한 상태 값을 추가해주세요!
};
export const createSpaceState = atomWithReset(INITIAL_SPACE_STATE);

// * 현재 선택된 스페이스 전역 상태
export const currentSpaceState = atom<Space | null>(null);
