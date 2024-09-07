import mixpanel, { type OverridedMixpanel } from "mixpanel-browser";
import { type PropsWithChildren } from "react";
import { useRef, useCallback } from "react";

import { LOCAL_STORAGE_KEYS } from "@/config/storage-keys";
import { createContext } from "@/lib/create-context";
import { TrackFunction } from "@/lib/provider/mix-pannel-provider/event.type";

export const UTM_PARAMS_KEY = "UTM_PARAM";

const isDev = !!import.meta.env.DEV;

if (isDev) {
  mixpanel.init(`${import.meta.env.VITE_MIXPANEL_TOKEN}`, {
    debug: true,
  });
} else {
  mixpanel.init(`${import.meta.env.VITE_MIXPANEL_TOKEN}`, {
    track_pageview: "url-with-path",
  });
}

interface MixpanelContext {
  mixpanel: OverridedMixpanel;
  track: TrackFunction;
  setPeople: (memberId: string) => void;
}

const [Provider, useMixpanel] = createContext<MixpanelContext>("MIX_PANEL_PROVIDER");

const MixpanelProvider = ({ children }: PropsWithChildren) => {
  const mixpanelRef = useRef(mixpanel).current;

  const track: MixpanelContext["track"] = useCallback((...params) => {
    const [eventName, args] = params;
    if (isDev) {
      console.log("Mixpanel tracking event...", eventName, args);
      return;
    }

    const utmParams = getUtmFromLocalStorage();
    mixpanel.track(eventName, { ...args, ...utmParams });
  }, []);

  const setPeople = useCallback((memberId: string) => {
    if (isDev) {
      console.log("Mixpanel tracking user...", memberId);
      return;
    }

    const utmParams = getUtmFromLocalStorage();
    mixpanel.identify(memberId);
    mixpanel.people.set({ ...utmParams });
  }, []);

  return (
    <Provider mixpanel={mixpanelRef} track={track} setPeople={setPeople}>
      {children}
    </Provider>
  );
};

export { MixpanelProvider, useMixpanel };

type UtmParam = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

function getUtmFromLocalStorage() {
  const storageValue = localStorage.getItem(LOCAL_STORAGE_KEYS.utmParamsKey) ?? "{}";
  const utmParams = new Map(Object.entries(JSON.parse(storageValue) as Record<string, string>));

  const searchParams = new URLSearchParams(window.location.search);
  const result = {
    utm_campaign: searchParams.get("utm_campaign") || utmParams.get("utm_campaign"),
    utm_content: searchParams.get("utm_content") || utmParams.get("utm_content"),
    utm_medium: searchParams.get("utm_medium") || utmParams.get("utm_medium"),
    utm_source: searchParams.get("utm_source") || utmParams.get("utm_source"),
    utm_ter: searchParams.get("utm_ter") || utmParams.get("utm_ter"),
  } as UtmParam;

  localStorage.setItem(LOCAL_STORAGE_KEYS.utmParamsKey, JSON.stringify(result));
  return result;
}
