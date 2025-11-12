import { atom } from "jotai";

// 기존 unsavedChanges
export const isRetrospectModifiedAtom = atom(false);

// 모달 열림 상태 추가
export const isTemporarySaveModalOpenAtom = atom(false);
