import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

export const SATISTFACTION_COLOR: { [key: number]: string } = {
  0: DESIGN_TOKEN_COLOR.blue800,
  1: DESIGN_TOKEN_COLOR.blue700,
  2: DESIGN_TOKEN_COLOR.blue400,
  3: DESIGN_TOKEN_COLOR.blue500,
  4: DESIGN_TOKEN_COLOR.blue600,
} as const;

export const ACHIEVEMENT_COLOR: { [key: number]: string } = {
  0: "#E2EBFE",
  1: "#C4D7FD",
  2: "#A7C4FC",
  3: "#89B0FB",
  4: "#6C9CFA",
} as const;

export const ACHIEVEMENT_COLOR_DEFAULT_COLOR = "#6C9CFA";
