import { atom } from "jotai";

interface RetrospectInitialType {
  spaceId: string;
  templateId: string;
  tempTemplateId: string;
  saveTemplateId: boolean;
}

export const retrospectInitialState = atom<RetrospectInitialType>({
  spaceId: "",
  templateId: "",
  tempTemplateId: "",
  saveTemplateId: false,
});
