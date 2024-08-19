import { css } from "@emotion/react";
import { VariationPlacement } from "@popperjs/core";
import { OffsetModifier } from "@popperjs/core/lib/modifiers/offset";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { Portal } from "@/component/common/Portal";
import { Typography } from "@/component/common/typography";
import { BOUNCE } from "@/style/common/bounce";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

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
  bounce?: boolean;
  placement?: Extract<VariationPlacement, "top-start" | "top-end" | "bottom-start" | "bottom-end">;
  modifiers?: Partial<OffsetModifier>[];
  offset?: [number, number];
  hideOnClick?: boolean;
};

type ContentProps =
  | ({
      asChild: true;
      children: React.ReactNode;
    } & Content)
  | PropsWithChildren<{ asChild?: false } & Content>;

function Content({ asChild, children, message, bounce, placement = "top-end", offset = [8, 30], modifiers = [], hideOnClick = true }: ContentProps) {
  const context = useContext(TooltipContext);

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (hideOnClick) {
      setIsVisible(!context.hideTooltip);
    }
  }, [context.hideTooltip, hideOnClick]);

  const { styles, attributes } = usePopper(context.referenceEl, context.popperEl, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      ...modifiers,
    ],
  });

  const getArrowPosition = (placement: ContentProps["placement"]) => {
    const offsetX = offset[0] + (context.referenceEl?.offsetWidth ? context.referenceEl?.offsetWidth / 2 : 0);
    const offsetY = -0.4;
    switch (placement) {
      case "top-start":
        return css`
          bottom: ${offsetY}rem;
          left: ${offsetX}px;
        `;
      case "top-end":
        return css`
          bottom: ${offsetY}rem;
          right: ${offsetX}px;
        `;

      case "bottom-start":
        return css`
          top: ${offsetY}rem;
          left: ${offsetX}px;
        `;
      case "bottom-end":
        return css`
          top: ${offsetY}rem;
          right: ${offsetX}px;
        `;
    }
  };

  return (
    <Portal id="tooltip-root">
      {asChild ? (
        children
      ) : (
        <div
          ref={(el) => context.setPopperEl(el)}
          css={css`
            position: relative;
            background-color: ${DESIGN_SYSTEM_COLOR.blue600};
            padding: 1rem 1.4rem;
            border-radius: 1.2rem;
            width: max-content;
            ${bounce &&
            css`
              animation: ${BOUNCE} 1.3s ease infinite;
            `}
            opacity: ${isVisible ? 1 : 0};
            visibility: ${isVisible ? "visible" : "hidden"};
            transition:
              opacity 0.2s ease,
              visibility 0.2s ease;
          `}
          style={styles.popper}
          {...attributes.popper}
        >
          <Typography variant="CAPTION" color="white">
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
                background: ${DESIGN_SYSTEM_COLOR.blue600};
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
      )}
    </Portal>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
