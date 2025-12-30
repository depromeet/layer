export const PROJECT_CATEGORY_MAP = { 전체: "ALL", 개인: "INDIVIDUAL", 팀: "TEAM" } as const;

export const CATEGORY_NAMES = Object.keys(PROJECT_CATEGORY_MAP) as Array<keyof typeof PROJECT_CATEGORY_MAP>;
