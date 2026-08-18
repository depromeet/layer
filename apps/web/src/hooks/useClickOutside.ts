import { RefObject, useEffect, useRef } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  const handlerRef = useRef(handler);

  useEffect(function syncClickOutsideHandler() {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(function subscribeClickOutside() {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handlerRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return function unsubscribeClickOutside() {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
