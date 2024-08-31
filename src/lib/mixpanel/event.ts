import mixpanel from "mixpanel-browser";

type TargetEvent = "Space Create" | "Retrospect Create Start" | "Retrospect Create Complete";

export const trackEvent = (event: TargetEvent, properties?: Record<string, string>) => {
  if (import.meta.env.MODE === "development") {
    return;
  }
  mixpanel.track(event, properties);
};
