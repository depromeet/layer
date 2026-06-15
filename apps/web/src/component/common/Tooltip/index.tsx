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
  align?: TooltipAlign;
  theme?: TooltipTheme;
  delay?: number;
}

type TooltipPlacement = "top" | "bottom" | "left" | "right";
/** top/bottom placement에서 교차축(가로) 정렬. start면 트리거 왼쪽 모서리에 맞춰 오른쪽으로 펼쳐진다. */
type TooltipAlign = "center" | "start" | "end";
/** dark: 회색(gray900) 배경 + 파란 NEW 칩 / blue: 파란(blue600) 배경 + 흰색 NEW 칩 */
type TooltipTheme = "dark" | "blue";

interface TooltipProps {
  children: ReactNode;
  placement?: TooltipPlacement;
  align?: TooltipAlign;
  theme?: TooltipTheme;
  delay?: number;
  disabled?: boolean;
  /** 마운트 시 기본으로 열어둔다 (안내/announcement 용도) */
  defaultOpen?: boolean;
  /**
   * defaultOpen 안내 툴팁을 "한 번만" 노출하기 위한 localStorage 키.
   * 지정하면 최초 1회 표시 후 기록되어 이후에는 자동으로 열리지 않는다.
   */
  storageKey?: string;
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

// localStorage는 프라이빗 모드/쿠키 차단 정책에서 접근 자체가 throw할 수 있어 안전하게 감싼다.
const safeGetSeen = (storageKey?: string): boolean => {
  if (!storageKey || typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
};

const safeSetSeen = (storageKey?: string) => {
  if (!storageKey || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, "true");
  } catch {
    // 저장 실패 시 무시한다 (안내 툴팁이 다음에 다시 떠도 무방).
  }
};

const TooltipContext = createContext<TooltipContextType | null>(null);

const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip 컴포넌트는 Tooltip Provider 내에서 사용되어야 합니다.");
  }
  return context;
};

const Tooltip = ({
  children,
  placement = "top",
  align = "center",
  theme = "dark",
  delay = 200,
  disabled = false,
  defaultOpen = false,
  storageKey,
}: TooltipProps) => {
  // storageKey가 있으면 "이미 본 적 있는지"를 localStorage에서 읽어 자동 노출 여부를 결정한다.
  const hasSeen = safeGetSeen(storageKey);
  const [isOpen, setIsOpen] = useState(defaultOpen && !hasSeen);
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
    align,
    theme,
    delay,
  };

  // defaultOpen 안내 툴팁이 최초로 노출되면 기록하여 이후에는 자동으로 뜨지 않게 한다.
  useEffect(() => {
    if (defaultOpen && !hasSeen) {
      safeSetSeen(storageKey);
    }
  }, [defaultOpen, storageKey, hasSeen]);

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

// crossOffsetPx: top/bottom일 때 화살표를 콘텐츠 왼쪽 모서리 기준 몇 px 지점에 둘지. null이면 가운데(50%).
const getArrowStyle = (placement: TooltipPlacement, crossOffsetPx: number | null = null, theme: TooltipTheme = "dark"): CSSProperties => {
  const base: CSSProperties = {
    position: "absolute",
    width: "0.8rem",
    height: "0.8rem",
    backgroundColor: theme === "blue" ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray900,
    borderRadius: "0.1rem",
  };

  const horizontal = crossOffsetPx != null ? `${crossOffsetPx}px` : "50%";

  switch (placement) {
    case "top":
      return { ...base, bottom: "-0.3rem", left: horizontal, transform: "translateX(-50%) rotate(45deg)" };
    case "bottom":
      return { ...base, top: "-0.3rem", left: horizontal, transform: "translateX(-50%) rotate(45deg)" };
    case "left":
      return { ...base, right: "-0.3rem", top: "50%", transform: "translateY(-50%) rotate(45deg)" };
    case "right":
    default:
      return { ...base, left: "-0.3rem", top: "50%", transform: "translateY(-50%) rotate(45deg)" };
  }
};

const TooltipContent = ({ children, className = "", sideOffset = 16, tag, arrow = false }: TooltipContentProps) => {
  const { isOpen, contentRef, triggerRef, placement = "top", align = "center", theme = "dark" } = useTooltip();
  const [style, setStyle] = useState<CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
  });
  // top/bottom + align !== center 일 때 화살표를 트리거 위/아래 중앙으로 보정하기 위한 가로 오프셋(px)
  const [arrowCross, setArrowCross] = useState<number | null>(null);

  const computeStyle = useCallback((): { content: CSSProperties; arrowCross: number | null } => {
    const trigger = triggerRef.current;
    const style: CSSProperties = {
      position: "absolute",
      zIndex: 9999,
      backgroundColor: theme === "blue" ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray900,
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
      return { content: style, arrowCross: null };
    }

    const triggerRect = trigger.getBoundingClientRect();
    // top/bottom 가로 정렬: start면 트리거 왼쪽 모서리에 맞추고, end면 오른쪽 모서리에 맞춘다.
    let arrowCross: number | null = null;
    const horizontalAlign = () => {
      switch (align) {
        case "start":
          style.left = triggerRect.left + window.scrollX;
          arrowCross = triggerRect.width / 2;
          return "";
        case "end":
          style.left = triggerRect.right + window.scrollX;
          arrowCross = null;
          return "translateX(-100%)";
        case "center":
        default:
          style.left = triggerRect.left + triggerRect.width / 2 + window.scrollX;
          arrowCross = null;
          return "translateX(-50%)";
      }
    };
    const baseTransform = (() => {
      switch (placement) {
        case "top": {
          const x = horizontalAlign();
          style.top = triggerRect.top - sideOffset + window.scrollY;
          return `${x} translateY(-100%)`;
        }
        case "bottom": {
          const x = horizontalAlign();
          style.top = triggerRect.bottom + sideOffset + window.scrollY;
          return x;
        }
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

    return { content: style, arrowCross };
  }, [isOpen, placement, align, theme, sideOffset, tag, triggerRef]);

  // * portal + absolute 위치라 레이아웃이 바뀌면 좌표가 틀어진다.
  // * 스크롤/리사이즈 및 콘텐츠 크기 변화(ResizeObserver)에 맞춰 위치를 다시 계산한다.
  useLayoutEffect(() => {
    const update = () => {
      const { content, arrowCross } = computeStyle();
      setStyle(content);
      setArrowCross(arrowCross);
    };
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
      {arrow && <span style={getArrowStyle(placement, arrowCross, theme)} />}
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
            border: theme === "blue" ? "0.3rem solid rgba(255, 255, 255, 0.2)" : "0.3rem solid rgba(108, 156, 250, 0.4)",
            backgroundColor: theme === "blue" ? "#FFFFFF" : DESIGN_TOKEN_COLOR.blue600,
            backgroundClip: "padding-box",
            color: theme === "blue" ? DESIGN_TOKEN_COLOR.blue600 : "#FFFFFF",
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
