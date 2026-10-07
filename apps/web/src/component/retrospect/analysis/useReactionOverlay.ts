import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

import { useBottomSheet } from "@/hooks/useBottomSheet";
import useClickOutside from "@/hooks/useClickOutside";
import { RetrospectReaction, RetrospectReactionCode } from "@/types/retrospectReaction";

export type ReactionGroup = {
  code: RetrospectReaction["emojiCode"];
  reactions: RetrospectReaction[];
};

export type ReactionOverlayState =
  | { type: "selector" }
  | { type: "status"; codes: RetrospectReactionCode[]; keepOpenOnDelete?: boolean }
  | null;

type UseReactionOverlayParams = {
  answerId: number;
  isMobile: boolean;
};

type OpenStatusOptions = {
  keepOpenOnDelete?: boolean;
};

export const useReactionOverlay = ({ answerId, isMobile }: UseReactionOverlayParams) => {
  const sheetId = `reaction-${answerId}`;
  const { openBottomSheet, closeBottomSheet, bottomSheetState } = useBottomSheet();
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElementState] = useState<HTMLDivElement | null>(null);
  const [overlay, setOverlay] = useState<ReactionOverlayState>(null);
  const popperElementRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popper = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top-start"] } },
      { name: "preventOverflow", options: { padding: 8 } },
    ],
  });

  const clearCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const closeOverlay = () => {
    clearCloseTimer();
    setOverlay(null);
    setReferenceElement(null);
    if (isMobile) closeBottomSheet();
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(closeOverlay, 120);
  };

  const setPopperElement = useCallback((element: HTMLDivElement | null) => {
    popperElementRef.current = element;
    setPopperElementState(element);
  }, []);

  useClickOutside(popperElementRef, (event) => {
    if (!overlay || isMobile || referenceElement?.contains(event.target as Node)) return;
    closeOverlay();
  });

  useEffect(function closeDesktopOverlayOnScroll() {
    if (!overlay || isMobile) return;

    const handleScroll = (event: Event) => {
      if (event.target instanceof Node && popperElement?.contains(event.target)) return;
      closeOverlay();
    };

    window.addEventListener("scroll", handleScroll, true);
    return function removeScrollListener() {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isMobile, overlay, popperElement]);

  useEffect(function syncOverlayWithBottomSheet() {
    if (!isMobile || !overlay) return;
    if (!bottomSheetState.visible || bottomSheetState.id !== sheetId) setOverlay(null);
  }, [bottomSheetState, isMobile, overlay, sheetId]);

  useEffect(function clearOverlayCloseTimerOnUnmount() {
    return function clearOverlayCloseTimer() {
      clearCloseTimer();
    };
  }, []);

  const openStatus = (event: MouseEvent<HTMLElement>, codes: RetrospectReactionCode[], options?: OpenStatusOptions) => {
    clearCloseTimer();
    if (isMobile) {
      openBottomSheet({ id: sheetId });
    } else {
      setReferenceElement(event.currentTarget);
    }
    setOverlay({ type: "status", codes, keepOpenOnDelete: options?.keepOpenOnDelete });
  };

  const openSelector = (event: MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      openBottomSheet({ id: sheetId });
    } else {
      setReferenceElement(event.currentTarget);
    }
    setOverlay({ type: "selector" });
  };

  return {
    overlay,
    sheetId,
    popper,
    setPopperElement,
    clearCloseTimer,
    closeOverlay,
    scheduleClose,
    openStatus,
    openSelector,
  };
};
