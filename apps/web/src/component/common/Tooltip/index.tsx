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
  useLayoutEffect,
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
  /** 마운트 시 기본으로 열어둔다 (안내/announcement 용도) */
  defaultOpen?: boolean;
}

interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: ReactNode;
  className?: string;
  sideOffset?: number;
  /** 본문 앞에 붙는 칩(예: "NEW"). 문자열/노드 모두 가능 */
  tag?: ReactNode;
  /** placement 방향을 가리키는 꼬리(화살표) 노출 여부 */
  arrow?: boolean;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip 컴포넌트는 Tooltip Provider 내에서 사용되어야 합니다.");
  }
  return context;
};

const Tooltip = ({ children, placement = "top", delay = 200, disabled = false, defaultOpen = false }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const open = useCallback(() => {
    if (disabled) return;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, delay);
  }, [disabled, delay]);

  const close = useCallback(() => {
    if (timeoutRef.current !== null) {
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
      if (timeoutRef.current !== null) {
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

const getArrowStyle = (placement: TooltipPlacement): CSSProperties => {
  const base: CSSProperties = {
    position: "absolute",
    width: "0.8rem",
    height: "0.8rem",
    backgroundColor: DESIGN_TOKEN_COLOR.gray900,
    borderRadius: "0.1rem",
  };

  switch (placement) {
    case "top":
      return { ...base, bottom: "-0.3rem", left: "50%", transform: "translateX(-50%) rotate(45deg)" };
    case "bottom":
      return { ...base, top: "-0.3rem", left: "50%", transform: "translateX(-50%) rotate(45deg)" };
    case "left":
      return { ...base, right: "-0.3rem", top: "50%", transform: "translateY(-50%) rotate(45deg)" };
    case "right":
    default:
      return { ...base, left: "-0.3rem", top: "50%", transform: "translateY(-50%) rotate(45deg)" };
  }
};

const TooltipContent = ({ children, className = "", sideOffset = 16, tag, arrow = false }: TooltipContentProps) => {
  const { isOpen, contentRef, triggerRef, placement = "top" } = useTooltip();
  const [style, setStyle] = useState<CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
  });

  const computeStyle = useCallback((): CSSProperties => {
    const trigger = triggerRef.current;
    const style: CSSProperties = {
      position: "absolute",
      zIndex: 9999,
      backgroundColor: DESIGN_TOKEN_COLOR.gray900,
      color: "#FFFFFF",
      padding: "1rem 1.4rem",
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

    if (tag != null) {
      style.display = "inline-flex";
      style.alignItems = "center";
      style.gap = "1rem";
    }

    if (!trigger) {
      style.opacity = 0;
      style.visibility = "hidden";
      return style;
    }

    const triggerRect = trigger.getBoundingClientRect();
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

    style.transform = `${baseTransform} ${isOpen ? "scale(1)" : "scale(0.95)"}`;

    return style;
  }, [isOpen, placement, sideOffset, tag, triggerRef]);

  // * portal + absolute 위치라 레이아웃이 바뀌면 좌표가 틀어진다.
  // * 스크롤/리사이즈 및 콘텐츠 크기 변화(ResizeObserver)에 맞춰 위치를 다시 계산한다.
  useLayoutEffect(() => {
    const update = () => setStyle(computeStyle());
    update();

    if (!isOpen) return;

    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(update);
      if (triggerRef.current) resizeObserver.observe(triggerRef.current);
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();
    };
  }, [isOpen, computeStyle, triggerRef]);

  return createPortal(
    <div ref={contentRef} id="tooltip-content" role="tooltip" className={className} style={style}>
      {arrow && <span style={getArrowStyle(placement)} />}
      {tag != null && (
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: "0.3rem 0.6rem",
            borderRadius: "999px",
            border: "0.3rem solid rgba(108, 156, 250, 0.4)",
            backgroundColor: DESIGN_TOKEN_COLOR.blue600,
            color: "#FFFFFF",
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: "normal",
            letterSpacing: "-0.01rem",
          }}
        >
          {tag}
        </span>
      )}
      <span style={{ position: "relative", fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.4 }}>{children}</span>
    </div>,
    document.body,
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
