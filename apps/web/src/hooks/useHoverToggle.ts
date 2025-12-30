import { useCallback, useState } from "react";

const useHoverToggle = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return { isHovered, handleMouseHover, handleMouseLeave };
};

export default useHoverToggle;
