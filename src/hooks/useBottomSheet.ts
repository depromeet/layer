import { useRef, useEffect } from "react";

import { BottomSheetType } from "@/component/BottomSheet/BottomSheet.tsx";
import { MIN_Y, MAX_Y } from "@/component/BottomSheet/BottomSheetOption.ts";
import { useStore } from "@/utils/externalStore/create.ts";
import { externalStore } from "@/utils/externalStore/hook.ts";

type BottomSheetMetrics = {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
};

const bottomSheetStore = externalStore<boolean>(false);

export const useBottomSheet = () => {
  const [bottomSheetState, setBottomSheetState] = useStore(bottomSheetStore);
  const openBottomSheet = () => {
    setBottomSheetState(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetState(false);
  };

  return { openBottomSheet, closeBottomSheet, bottomSheetState } as const;
};

export const useSetBottomSheet = ({ handler, sheetHeight }: Pick<BottomSheetType, "handler" | "sheetHeight">) => {
  const { bottomSheetState, closeBottomSheet } = useBottomSheet();
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    // Even if there is no handler bar, it doesn't fire the event.
    if (!handler) return;
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      }

      if (touchMove.movingDirection === "down") {
        return content.current!.scrollTop <= 0;
      }
      return false;
    };

    /** Bottom Sheet Move Start Event Handler */
    const handleStart = (e: TouchEvent | MouseEvent, method: string = "touch") => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = method === "touch" ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      if (method === "mouse") {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    };

    /** Bottom Sheet Move Event Handler */
    const handleMove = (e: TouchEvent | MouseEvent, method: string = "touch") => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = method === "touch" ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      if (currentTouch === touchStart.touchY) return;
      if (touchMove.prevTouchY === undefined) touchMove.prevTouchY = touchStart.touchY;
      if (touchMove.prevTouchY === 0) touchMove.prevTouchY = touchStart.touchY;
      if (touchMove.prevTouchY < currentTouch) touchMove.movingDirection = "down";
      if (touchMove.prevTouchY > currentTouch) touchMove.movingDirection = "up";

      if (canUserMoveBottomSheet()) {
        e.preventDefault();
        const touchOffset = currentTouch - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;
        if (nextSheetY <= MIN_Y) nextSheetY = MIN_Y;
        if (nextSheetY >= MAX_Y) nextSheetY = MAX_Y;
        if (Math.abs(nextSheetY - MAX_Y) > (sheetHeight as number)) return;

        sheet.current!.style.setProperty("transform", `translate3d(-50%, ${nextSheetY - MAX_Y}px, 0)`);
      } else {
        document.body.style.overflowY = "hidden";
      }
    };

    /** Bottom Sheet Move End Event Handler */
    const handleEnd = (e: TouchEvent | MouseEvent, method = "touch") => {
      document.body.style.overflowY = "auto";
      const { touchMove } = metrics.current;
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === "down") {
          if (method === "touch") {
            if (content.current!.scrollTop !== 0 && content.current!.contains(<Node>e.target)) return;
          }
          sheet.current!.style.setProperty("transform", "translate3d(-50%, 0, 0)");
          closeBottomSheet();
        }

        if (touchMove.movingDirection === "up") {
          sheet.current!.style.setProperty("transform", `translate3d(-50%, -${sheetHeight}px, 0)`);
        }
      }
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };

      if (method === "mouse") {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };

    const handleMouseDown = (e: MouseEvent) => handleStart(e, "mouse");
    const handleMouseMove = (e: MouseEvent) => handleMove(e, "mouse");
    const handleMouseUp = (e: MouseEvent) => handleEnd(e, "mouse");
    const handleTouchStart = (e: TouchEvent) => handleStart(e, "touch");
    const handleTouchMove = (e: TouchEvent) => handleMove(e, "touch");
    const handleTouchEnd = (e: TouchEvent) => handleEnd(e, "touch");

    sheet.current!.addEventListener("mousedown", handleMouseDown);
    sheet.current!.addEventListener("touchstart", handleTouchStart);
    sheet.current!.addEventListener("touchmove", handleTouchMove);
    sheet.current!.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.current!.removeEventListener("mousedown", handleMouseDown);
      sheet.current!.removeEventListener("touchstart", handleTouchStart);
      sheet.current!.removeEventListener("touchmove", handleTouchMove);
      sheet.current!.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };
    content.current!.addEventListener("touchstart", handleTouchStart);

    return () => content.current!.removeEventListener("touchstart", handleTouchStart);
  }, []);

  useEffect(() => {
    if (!bottomSheetState) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bottomSheetState]);

  return { sheet, content };
};
