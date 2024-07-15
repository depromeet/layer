import { css } from "@emotion/react";
import { useRef, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { ANIMATION } from "@/style/common/animation";
import { toastMap } from "@/style/common/toast";
import { ToastType } from "@/types/toast";
import { collapseToast } from "@/util/toast/collapseToast";
import Icon from "@/component/common/Icon/Icon";

export function ToastItem({ type, content, id, duration = 3000 }: ToastType) {
  const { removeToast } = useToast();
  const toastRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleExitingAnimationEnd = () => {
    setIsClosing(true);
    collapseToast(toastRef.current!, () => {
      removeToast(id);
    });
  };

  const handleTriggerAnimationEnd = () => {
    duration && setIsClosing(true);
  };

  const handleClick = () => {
    handleTriggerAnimationEnd();
  };

  const handleMouseEnter = () => {
    duration && setIsPaused(true);
  };

  const handleMouseLeave = () => {
    duration && setIsPaused(false);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Icon icon="ic_success" size={2.4} color="#A5C4F2" style={{ marginRight: "2rem" }} />;
      case "error":
        return <Icon icon="ic_success" size={2.4} color="#ffffff" style={{ marginRight: "2rem" }} />;
    }
  };

  return (
    <div ref={toastRef}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onAnimationEnd={handleExitingAnimationEnd}
        onClick={handleClick}
        css={css`
          animation: 0.7s forwards ${isClosing ? ANIMATION.FADE_OUT : "none"};
          width: 33.5rem;
          padding: 2rem 2rem;
          border-radius: 1.2rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;

          ${toastMap[type]}
        `}
      >
        {getIcon()}
        {content}
        <div
          onAnimationEnd={handleTriggerAnimationEnd}
          css={css`
            animation: ${duration
              ? css`
                  ${ANIMATION.TRIGGER} ${duration}ms
                `
              : "none"};
            animation-play-state: ${isPaused ? "paused" : "running"};
          `}
        />
      </div>
    </div>
  );
}
