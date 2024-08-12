import { useRef, useEffect, useCallback } from "react";

type UseIntersectionObserveOptions = {
  options: IntersectionObserverInit;
  onIntersect: () => void;
};

export const useIntersectionObserve = ({ options, onIntersect }: UseIntersectionObserveOptions) => {
  const targetDivRef = useRef<HTMLDivElement>(null);

  const observeCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          onIntersect();
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!targetDivRef.current) return;
    const observer = new IntersectionObserver(observeCallback, options);
    observer.observe(targetDivRef.current);
    return () => observer.disconnect();
  }, [targetDivRef, options, observeCallback]);

  return targetDivRef;
};
