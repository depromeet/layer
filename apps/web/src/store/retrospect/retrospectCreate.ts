import { atomWithReset } from "jotai/utils";

import { RetrospectCreateReq } from "@/types/retrospectCreate";

export const DEFAULT_QUESTIONS = [
  {
    questionContent: "진행 상황에 대해 얼마나 만족하나요?",
    questionType: "number",
  },
  {
    questionContent: "목표했던 부분에 얼마나 달성했나요?",
    questionType: "range",
  },
] as RetrospectCreateReq["questions"];

const CREATE_RETROSPECT_INIT_TITLE = atomWithReset<RetrospectCreateReq["title"]>("");
const CREATE_RETROSPECT_INIT_INTRODUCTION = atomWithReset<RetrospectCreateReq["introduction"]>("");
const CREATE_RETROSPECT_INIT_QUESTIONS = atomWithReset<RetrospectCreateReq["questions"]>([]);
const CREATE_RETROSPECT_INIT_DEADLINE = atomWithReset<RetrospectCreateReq["deadline"]>("");
const CREATE_RETROSPECT_INIT_IS_NEW_FORM = atomWithReset<RetrospectCreateReq["isNewForm"]>(false);
const CREATE_RETROSPECT_INIT_HAS_CHANGED_ORIGINAL = atomWithReset<RetrospectCreateReq["hasChangedOriginal"]>(false);
const CREATE_RETROSPECT_INIT_CUR_FORM_ID = atomWithReset<RetrospectCreateReq["curFormId"]>(-1);

export const CREATE_RETROSPECT_INIT_ATOM = {
  title: CREATE_RETROSPECT_INIT_TITLE,
  introduction: CREATE_RETROSPECT_INIT_INTRODUCTION,
  questions: CREATE_RETROSPECT_INIT_QUESTIONS,
  deadline: CREATE_RETROSPECT_INIT_DEADLINE,
  isNewForm: CREATE_RETROSPECT_INIT_IS_NEW_FORM,
  hasChangedOriginal: CREATE_RETROSPECT_INIT_HAS_CHANGED_ORIGINAL,
  curFormId: CREATE_RETROSPECT_INIT_CUR_FORM_ID,
};

export const retrospectCreateAtom = atomWithReset<RetrospectCreateReq>({
  title: "",
  introduction: "",
  questions: [],
  deadline: "",
  isNewForm: false,
  hasChangedOriginal: false,
  curFormId: -1,
});
