import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

const AD_UNIT_ID = "DAN-Fju0KXRw9VNE9YF4";
const AD_SCRIPT_URL = "https://t1.kakaocdn.net/kas/static/ba.min.js";

export function KakaoAdFit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ad = document.createElement("ins");
    ad.className = "kakao_ad_area";
    ad.style.display = "none";
    ad.dataset.adUnit = AD_UNIT_ID;
    ad.dataset.adWidth = "320";
    ad.dataset.adHeight = "50";

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = AD_SCRIPT_URL;

    container.replaceChildren(ad, script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="광고"
      css={css`
        display: flex;
        justify-content: center;
        min-height: 5rem;
        flex-shrink: 0;
      `}
    />
  );
}
