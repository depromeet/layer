declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID;
const isProduction = import.meta.env.MODE === "production";

export const trackPageView = (path: string) => {
  if (!isProduction) return;
  window.gtag("config", GA_ID, { page_path: path });
};

export const trackEvent = (params: { action: string; category: string; label?: string }) => {
  if (!isProduction) return;
  window.gtag("event", params.action, {
    event_category: params.category,
    event_label: params.label,
  });
};
