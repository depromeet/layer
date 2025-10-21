import { CREATE_RETROSPECT_INIT_ATOM } from "@/store/retrospect/retrospectCreate";
import { useResetAtom } from "jotai/utils";

export const useRetrospectCreateReset = () => {
  const CREATE_RETROSPECT_RESET_ATOMS = Object.values(CREATE_RETROSPECT_INIT_ATOM);

  const ConvertToResetAtoms = CREATE_RETROSPECT_RESET_ATOMS.map((atom) => useResetAtom(atom));

  const resetAll = () => {
    ConvertToResetAtoms.forEach((reset) => reset());
  };

  return { resetAll };
};
