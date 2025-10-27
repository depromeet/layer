import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  handleCollapse: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  // * LNB 열림 상태
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleCollapse = (value: boolean) => {
    setIsCollapsed(value);
  };

  return <NavigationContext.Provider value={{ isCollapsed, toggleCollapse, handleCollapse }}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
