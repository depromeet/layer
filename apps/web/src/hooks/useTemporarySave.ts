import { useAtom, useAtomValue } from "jotai";
import { unsavedChangesAtom, isTemporarySaveModalOpenAtom } from "@/store/retrospect/retrospectWrite";

export function useTemporarySave() {
  const hasUnsavedChanges = useAtomValue(unsavedChangesAtom);
  const [isTemporarySaveModalOpen, setTemporarySaveModalOpen] = useAtom(isTemporarySaveModalOpenAtom);

  return {
    hasUnsavedChanges,
    isTemporarySaveModalOpen,
    setTemporarySaveModalOpen,
  };
}
