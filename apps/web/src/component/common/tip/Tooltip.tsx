import { css } from "@emotion/react";
import { VariationPlacement } from "@popperjs/core";
import { OffsetModifier } from "@popperjs/core/lib/modifiers/offset";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { Portal } from "@/component/common/Portal";
import { Typography } from "@/component/common/typography";
import { ANIMATION } from "@/style/common/animation";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type TooltipContextState = {
  referenceEl: HTMLDivElement | null;
  popperEl: HTMLDivElement | null;
  setReferenceEl: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  setPopperEl: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  hideTooltip: boolean;
  setHideTooltip: React.Dispatch<React.SetStateAction<boolean>>;
};

const TooltipContext = createContext<TooltipContextState>({
  referenceEl: null,
  popperEl: null,
  setReferenceEl: () => {},
  setPopperEl: () => {},
  hideTooltip: false,
  setHideTooltip: () => {},
});

type TooltipProps = {
  children: React.ReactNode;
};

export function Tooltip({ children }: TooltipProps) {
  const [referenceEl, setReferenceEl] = useState<HTMLDivElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
  const [hideTooltip, setHideTooltip] = useState(false);

  return (
    <TooltipContext.Provider value={{ referenceEl, popperEl, setReferenceEl, setPopperEl, hideTooltip, setHideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  const context = useContext(TooltipContext);
  if (!context) return;
  return (
    <div ref={(el) => context.setReferenceEl(el)} onClick={() => context.setHideTooltip((p) => !p)}>
      {children}
    </div>
  );
}

type Content = {
  message: string;
  animate?: boolean;
  placement: Extract<VariationPlacement, "top-start" | "top-end" | "bottom-start" | "bottom-end">;
  modifiers?: Partial<OffsetModifier>[];
  offsetX?: number;
  offsetY?: number;
  arrowOffsetX?: number;
  hideOnClick?: boolean;
  autoHide?: boolean;
};

type ContentProps =
  | ({
      asChild: true;
      children: React.ReactNode;
    } & Content)
  | PropsWithChildren<{ asChild?: false } & Content>;

function Content({
  asChild,
  children,
  message,
  animate = true,
  placement,
  offsetX = 0,
  offsetY = 30,
  arrowOffsetX = 2,
  modifiers = [],
  hideOnClick = true,
  autoHide = true,
}: ContentProps) {
  const context = useContext(TooltipContext);

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHide]);

  useEffect(() => {
    if (hideOnClick) {
      setIsVisible(!context.hideTooltip);
    }
  }, [context.hideTooltip, hideOnClick]);

  const { styles, attributes, update } = usePopper(context.referenceEl, context.popperEl, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [offsetX, offsetY],
        },
      },
      ...modifiers,
    ],
  });

  // 트리거 크기가 바뀌면(예: 사이드바 접기/펼치기) 툴팁 위치를 다시 계산한다.
  // ex LNB가 접혔을 때와 펼쳤을 때, 높이가 다른 경우가 발생함.
  useEffect(() => {
    const referenceEl = context.referenceEl;
    if (!referenceEl || !update || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(() => {
      update();
    });
    resizeObserver.observe(referenceEl);

    return () => resizeObserver.disconnect();
  }, [context.referenceEl, update]);

  const getArrowPosition = (placement: ContentProps["placement"]) => {
    const offsetY = -0.4;

    switch (placement) {
      case "top-start":
        return css`
          bottom: ${offsetY}rem;
          left: ${arrowOffsetX}rem;
        `;
      case "top-end":
        return css`
          bottom: ${offsetY}rem;
          right: ${arrowOffsetX}rem;
        `;
      case "bottom-start":
        return css`
          top: ${offsetY}rem;
          left: ${arrowOffsetX}rem;
        `;
      case "bottom-end":
        return css`
          top: ${offsetY}rem;
          right: ${arrowOffsetX}rem;
        `;
    }
  };

  return (
    <Portal id="tooltip-root">
      {asChild ? (
        children
      ) : (
        <div ref={(el) => context.setPopperEl(el)} style={{ ...styles.popper, zIndex: 100001 }} {...attributes.popper}>
          <div
            css={css`
              position: relative;
              z-index: 100001;
              background: ${DESIGN_TOKEN_COLOR.gray900};
              padding: 1rem 1.4rem;
              border-radius: 0.8rem;
              width: max-content;
              ${animate &&
              css`
                animation: ${placement === "top-start" || placement === "top-end" ? ANIMATION.FLOAT_UP : ANIMATION.FLOAT_DOWN} 1.7s ease infinite;
              `}
              opacity: ${isVisible ? 1 : 0};
              visibility: ${isVisible ? "visible" : "hidden"};
              transition:
                opacity 0.2s ease,
                visibility 0.2s ease;
            `}
          >
            <Typography variant="body12SemiBold" color="white">
              {message}
            </Typography>
            <div
              css={css`
                ::before {
                  position: absolute;
                  ${getArrowPosition(placement)}
                  width: 1.2rem;
                  height: 1.2rem;
                  border-radius: 0.2rem;
                  background: ${DESIGN_TOKEN_COLOR.gray900};
                  visibility: visible;
                  content: "";
                  transform: rotate(45deg);
                  opacity: ${isVisible ? 1 : 0};
                  visibility: ${isVisible ? "visible" : "hidden"};
                  transition:
                    opacity 0.2s ease,
                    visibility 0.2s ease;
                }
              `}
            />
          </div>
        </div>
      )}
    </Portal>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
