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

type flowType = "INFO" | "RECOMMEND" | "RECOMMEND_PROGRESS" | "CREATE" | "COMPLETE";
const CREATE_SPACE_INIT_FLOW = atomWithReset<flowType>("INFO");
const CREATE_SPACE_INIT_TITLE = atomWithReset<string>("");
const CREATE_SPACE_INIT_DESCRIPTION = atomWithReset<string>("");
const CREATE_SPACE_INIT_PHASE = atomWithReset<number>(0);
const CREATE_SPACE_INIT_PURPOSE = atomWithReset<string>("");
const CREATE_SPACE_INIT_PERIOD = atomWithReset<string | null>(null);
const CREATE_SPACE_INIT_PERIODIC = atomWithReset<"REGULAR" | "IRREGULAR" | null>(null);
const CREATE_SPACE_INIT_CATEGORY = atomWithReset<ProjectType | null>(null);
const CREATE_SPACE_INIT_RECOMMEND_TEMPLATE_TYPE = atomWithReset<"recommendation" | "list" | null>(null);

export const CREATE_SPACE_INIT_ATOM = {
  flow: CREATE_SPACE_INIT_FLOW,
  title: CREATE_SPACE_INIT_TITLE,
  description: CREATE_SPACE_INIT_DESCRIPTION,
  phase: CREATE_SPACE_INIT_PHASE,
  purpose: CREATE_SPACE_INIT_PURPOSE,
  period: CREATE_SPACE_INIT_PERIOD,
  periodic: CREATE_SPACE_INIT_PERIODIC,
  category: CREATE_SPACE_INIT_CATEGORY,
  recommendTemplateType: CREATE_SPACE_INIT_RECOMMEND_TEMPLATE_TYPE,
};

// * 현재 선택된 스페이스 전역 상태
export const currentSpaceState = atom<Space | null>(null);
