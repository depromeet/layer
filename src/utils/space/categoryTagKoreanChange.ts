export const categoryTagKoreanChange = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    INDIVIDUAL: "개인",
    TEAM: "팀",
    PLANNER: "기획",
    EDUCATION: "교육",
    DEVELOPMENT: "개발",
    DESIGN: "디자인",
    MANAGEMENT: "운영 및 관리",
    DATA_ANALYSIS: "데이터 분석",
    MARKETING: "마케팅",
    RESEARCH: "연구",
    ETC: "기타",
  };

  return categoryMap[category] || "-";
};
