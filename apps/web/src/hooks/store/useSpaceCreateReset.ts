import { CREATE_SPACE_INIT_ATOM } from "@/store/space/spaceAtom";
import { useResetAtom } from "jotai/utils";

export const useSpaceCreateReset = () => {
  const CREATE_SPACE_RESET_ATOMS = Object.values(CREATE_SPACE_INIT_ATOM);

  const ConvertToResetAtoms = CREATE_SPACE_RESET_ATOMS.map((atom) => useResetAtom(atom));

  const resetAll = () => {
    ConvertToResetAtoms.forEach((reset) => reset());
  };

  return { resetAll };
};
