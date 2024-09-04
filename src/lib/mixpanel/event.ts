import mixpanel from "mixpanel-browser";

export const trackEvent = (event: string, properties?: Record<string, string>) => {
  if (import.meta.env.MODE === "development") {
    console.log("mixpanel tracking:", event, properties);
    return;
  }
  mixpanel.track(event, properties);
};
