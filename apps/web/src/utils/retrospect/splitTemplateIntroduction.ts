export interface SplitIntroduction {
  heading: string;
  description: string;
}

export const splitTemplateIntroduction = (introduction: string): SplitIntroduction => {
  const match = introduction.match(/^(.+?[은는])\s+(.+)$/);

  if (match) {
    return {
      heading: match[1],
      description: match[2],
    };
  }

  return {
    heading: "",
    description: introduction,
  };
};
