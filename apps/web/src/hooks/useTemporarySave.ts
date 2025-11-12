import { useAtom, useAtomValue } from "jotai";
import { isRetrospectModifiedAtom, isTemporarySaveModalOpenAtom } from "@/store/retrospect/retrospectWrite";

export function useTemporarySave() {
  const hasRetrospectModified = useAtomValue(isRetrospectModifiedAtom);
  const [isTemporarySaveModalOpen, setTemporarySaveModalOpen] = useAtom(isTemporarySaveModalOpenAtom);

  return {
    hasRetrospectModified,
    isTemporarySaveModalOpen,
    setTemporarySaveModalOpen,
  };
}
