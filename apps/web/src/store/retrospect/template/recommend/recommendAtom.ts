import { atomWithReset } from "jotai/utils";

import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

const initialState = {
  periodic: null,
  period: null,
  purpose: [],
  step: 0,
};

export const recommendTemplateState = atomWithReset<RecommendTemplateType>(initialState);
