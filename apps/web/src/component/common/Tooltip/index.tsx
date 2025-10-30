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

const TooltipTrigger = ({ children, asChild = false }: TooltipTriggerProps) => {
  const { open, close, triggerRef } = useTooltip();

  const handleMouseEnter = () => open();
  const handleMouseLeave = () => close();
  const handleFocus = () => open();
  const handleBlur = () => close();
  const handleClick = () => close();

  // asChild prop이 true일 때는 첫 번째 자식에 이벤트를 전달
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: (e: any) => {
        if (children.props.onClick) {
          children.props.onClick(e);
        }

        handleClick();
      },
      "aria-describedby": "tooltip-content",
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
      aria-describedby="tooltip-content"
    >
      {children}
    </span>
  );
};

const TooltipContent = ({ children, className = "", sideOffset = 16 }: TooltipContentProps) => {
  const { isOpen, contentRef, triggerRef, placement } = useTooltip();

  if (!isOpen) return null;

  const getTooltipStyle = (): CSSProperties => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const style: CSSProperties = {
      position: "absolute",
      zIndex: 9999,
      backgroundColor: DESIGN_TOKEN_COLOR.gray900,
      color: "#FFFFFF",
      padding: "10px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      border: "none",
      maxWidth: "200px",
      wordBreak: "keep-all",
      pointerEvents: "none",
      opacity: 1,
      transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
    };

    switch (placement) {
      case "top":
        style.left = triggerRect.left + triggerRect.width / 2;
        style.top = triggerRect.top - sideOffset;
        style.transform = "translateX(-50%) translateY(-100%)";
        break;
      case "bottom":
        style.left = triggerRect.left + triggerRect.width / 2;
        style.top = triggerRect.bottom + sideOffset;
        style.transform = "translateX(-50%)";
        break;
      case "left":
        style.left = triggerRect.left - sideOffset;
        style.top = triggerRect.top + triggerRect.height / 2;
        style.transform = "translateX(-100%) translateY(-50%)";
        break;
      case "right":
        style.left = triggerRect.right + sideOffset;
        style.top = triggerRect.top + triggerRect.height / 2;
        style.transform = "translateY(-50%)";
        break;
    }

    return style;
  };

  return createPortal(
    <div ref={contentRef} id="tooltip-content" role="tooltip" className={className} style={getTooltipStyle()}>
      {children}
    </div>,
    document.body,
  );
};

// Compound Component 패턴 적용
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
