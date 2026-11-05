const configuredUrl = process.env.SITE_URL;
export const siteUrl = (() => {
  try {
    const url = new URL(configuredUrl || "http://localhost:3001");
    if (
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      throw new Error("origin만 지정해야 합니다");
    }
    return url;
  } catch {
    throw new Error(
      "SITE_URL에는 경로나 인증 정보가 없는 유효한 사이트 주소를 지정해 주세요.",
    );
  }
})();
export const isPublicSite =
  Boolean(configuredUrl) &&
  siteUrl.protocol === "https:" &&
  !siteUrl.hostname.endsWith(".example") &&
  siteUrl.hostname !== "localhost";
export const appUrl = process.env.LAYER_APP_URL || "https://www.layerapp.io";
export const siteTitle = "레이어 Layer | 팀·개인 회고부터 AI 분석까지";
export const siteDescription =
  "회고를 다음 행동으로 연결하세요. 레이어에서 KPT·5F 등 회고 템플릿으로 팀과 개인의 경험을 돌아보고, AI 분석과 실행 목표로 더 나은 다음을 준비하세요.";
