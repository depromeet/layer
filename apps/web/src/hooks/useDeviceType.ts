import { useEffect, useState } from "react";

export function useDeviceType(threshold = 768): { deviceType: "mobile" | "desktop" } {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    setDeviceType(window.innerWidth <= threshold ? "mobile" : "desktop");
  }, []);

  return { deviceType };
}
