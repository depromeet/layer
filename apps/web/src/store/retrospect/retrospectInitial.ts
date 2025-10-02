import { atom } from "jotai";

interface RetrospectInitialType {
  spaceId: string;
  templateId: string;
}

export const retrospectInitialState = atom<RetrospectInitialType>({
  spaceId: "",
  templateId: "",
});
