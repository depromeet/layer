import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  CSSProperties,
  ReactNode,
  RefObject,
  isValidElement,
  cloneElement,
  useEffect,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";

interface TooltipContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: RefObject<HTMLElement>;
  contentRef: RefObject<HTMLDivElement>;
  placement?: TooltipPlacement;
  delay?: number;
}

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
}

interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: ReactNode;
  className?: string;
  sideOffset?: number;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip 컴포넌트는 Tooltip Provider 내에서 사용되어야 합니다.");
  }
  return context;
};

const Tooltip = ({ children, placement = "top", delay = 200, disabled = false }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  const open = useCallback(() => {
    if (disabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  }, [disabled, delay]);

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  }, []);

  const contextValue: TooltipContextType = {
    isOpen,
    open,
    close,
    triggerRef,
    contentRef,
    placement,
    delay,
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>;
};

const TooltipTrigger = ({ children, asChild = true }: TooltipTriggerProps) => {
  const { open, close, triggerRef } = useTooltip();

  const handleMouseEnter = () => open();
  const handleMouseLeave = () => close();
  const handleFocus = () => open();
  const handleBlur = () => close();
  const handleClick = () => close();

  // * asChild prop이 true일 때는 첫 번째 자식에 이벤트를 전달
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    return cloneElement(child, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: (e: any) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }

        handleClick();
      },
    });
  }

  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

const TooltipContent = ({ children, className = "", sideOffset = 16 }: TooltipContentProps) => {
  const { isOpen, contentRef, triggerRef, placement } = useTooltip();

  if (!triggerRef.current) {
    return null;
  }

  const getTooltipStyle = (): CSSProperties => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const style: CSSProperties = {
      position: "absolute",
      zIndex: 9999,
      backgroundColor: DESIGN_TOKEN_COLOR.gray900,
      color: "#FFFFFF",
      padding: "0.8rem 1.2rem",
      borderRadius: "0.8rem",
      whiteSpace: "nowrap",
      border: "none",
      wordBreak: "keep-all",
      pointerEvents: "none",
      transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, transform 0.2s ease-in-out",
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? "visible" : "hidden",
      transformOrigin: "center",
    };

    const baseTransform = (() => {
      switch (placement) {
        case "top":
          style.left = triggerRect.left + triggerRect.width / 2 + window.scrollX;
          style.top = triggerRect.top - sideOffset + window.scrollY;
          return "translateX(-50%) translateY(-100%)";
        case "bottom":
          style.left = triggerRect.left + triggerRect.width / 2 + window.scrollX;
          style.top = triggerRect.bottom + sideOffset + window.scrollY;
          return "translateX(-50%)";
        case "left":
          style.left = triggerRect.left - sideOffset + window.scrollX;
          style.top = triggerRect.top + triggerRect.height / 2 + window.scrollY;
          return "translateX(-100%) translateY(-50%)";
        case "right":
          style.left = triggerRect.right + sideOffset + window.scrollX;
          style.top = triggerRect.top + triggerRect.height / 2 + window.scrollY;
          return "translateY(-50%)";
        default:
          return "";
      }
    })();

    const scaleTransform = isOpen ? "scale(1)" : "scale(0.95)";
    style.transform = `${baseTransform} ${scaleTransform}`;

    return style;
  };

  return createPortal(
    <div ref={contentRef} id="tooltip-content" role="tooltip" className={className} style={getTooltipStyle()}>
      {children}
    </div>,
    document.body,
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
