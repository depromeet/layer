import { useEffect, useState } from "react";

interface useDeviceReturnType {
  deviceType: "mobile" | "desktop";
  isDesktop: boolean;
  isMobile: boolean;
}

export function useDeviceType(threshold = 768): useDeviceReturnType {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
  const { pathname } = window.location;
  const isDesktop = deviceType === "desktop" && !pathname.startsWith("/m");
  const isMobile = deviceType === "mobile" || pathname.startsWith("/m");

  useEffect(() => {
    setDeviceType(window.innerWidth <= threshold ? "mobile" : "desktop");
  }, []);

  return { deviceType, isDesktop, isMobile };
}
