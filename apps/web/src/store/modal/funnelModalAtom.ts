import { atom } from "jotai";

export interface FunnelModalState {
  isOpen: boolean;
  currentStep: "retrospectCreate" | "template" | "analysis" | null;
}

export const funnelModalState = atom<FunnelModalState>({
  isOpen: false,
  currentStep: null,
});
