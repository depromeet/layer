import { useAtom, useAtomValue } from "jotai";
import { isRetrospectModifiedAtom, isTemporarySaveModalOpenAtom } from "@/store/retrospect/retrospectWrite";

export function useTemporarySave() {
  const hasUnsavedChanges = useAtomValue(isRetrospectModifiedAtom);
  const [isTemporarySaveModalOpen, setTemporarySaveModalOpen] = useAtom(isTemporarySaveModalOpenAtom);

  return {
    hasUnsavedChanges,
    isTemporarySaveModalOpen,
    setTemporarySaveModalOpen,
  };
}
