import { css } from "@emotion/react";
import { useRef, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useToast } from "@/hooks/useToast";
import { ANIMATION } from "@/style/common/animation";
import { toastMap } from "@/style/common/toast";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { ToastType } from "@/types/toast";
import { collapseToast } from "@/utils/toast/collapseToast";

export function ToastItem({ type, content, id, duration = 3000 }: ToastType) {
  const { removeToast } = useToast();
  const toastRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleExitingAnimationEnd = () => {
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
        return <Icon icon="ic_success" size={2.4} color={DESIGN_TOKEN_COLOR.blue600} style={{ marginRight: "0.8rem" }} />;
      case "error":
        return <Icon icon="ic_warning" size={2.4} color={DESIGN_SYSTEM_COLOR.red500} style={{ marginRight: "0.8rem" }} />;
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
          width: fit-content;
          padding-top: 1.3rem;
          padding-bottom: 1.3rem;
          padding-inline: 2rem;
          white-space: nowrap;
          border-radius: 1.2rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          ${toastMap[type]}
        `}
      >
        {getIcon()}
        <Typography variant="B1" color="white">
          {content}
        </Typography>
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
