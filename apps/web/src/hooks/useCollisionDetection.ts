import { RefObject, useEffect, useState } from "react";

export const useCollisionDetection = (firstTargetRef: RefObject<HTMLElement>, twiceTargetRef: RefObject<HTMLElement>) => {
  const [isColliding, setIsColliding] = useState(false);
  const checkCollision = () => {
    if (firstTargetRef.current && twiceTargetRef.current) {
      const rect1 = firstTargetRef.current.getBoundingClientRect();
      const rect2 = twiceTargetRef.current.getBoundingClientRect();
      const isColliding = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
      setIsColliding(isColliding);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkCollision);
    window.addEventListener("resize", checkCollision);

    return () => {
      window.removeEventListener("scroll", checkCollision);
      window.removeEventListener("resize", checkCollision);
    };
  }, []);

  return isColliding;
};
