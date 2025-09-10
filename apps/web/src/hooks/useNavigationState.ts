import { useState, useCallback } from "react";

export function useNavigationState() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  return {
    isCollapsed,
    toggleCollapsed,
    setCollapsed,
  };
}
