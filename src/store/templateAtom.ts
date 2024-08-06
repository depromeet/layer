import { atomWithStorage } from "jotai/utils";

export const temporaryTemplateAtom = atomWithStorage<{ templateId?: number }>("template", {
  templateId: undefined,
});
