import { isInternalUser } from "@/utils/userUtil";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS;
const isProduction = import.meta.env.MODE === "production";

export const trackPageView = (path: string) => {
  if (!isProduction) return;
  window.gtag("config", GA_ID, { page_path: path });
};

export const trackEvent = (params: { action: string; category: string; label?: string }) => {
  if (!isProduction) return; // 실환경일 때만 추적
  if (isInternalUser()) return; // 레이어 내부 팀원가 아닐 경우에만 추적

  window.gtag("event", params.action, {
    event_category: params.category,
    event_label: params.label,
  });
};
