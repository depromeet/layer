export const formatTitle = (title: string, id: number) => {
  const titleMap: Record<number, string> = {
    10000: "차근차근,\n단계적인 회고",
    10001: "성장부터 성찰까지,\n올인원 회고",
    10002: "감정 통찰을\n위한 회고",
    10003: "상태 파악을\n위한 회고",
    10004: "단순하지만\n명확한 회고",
    10005: "내가 직접\n만드는 회고",
  };

  return titleMap[id] || title;
};
