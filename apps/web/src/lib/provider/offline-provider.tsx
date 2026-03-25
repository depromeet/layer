import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.2rem;
        padding: 2.4rem;
      `}
    >
      <Icon icon={"ic_error"} size={14} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          text-align: center;
        `}
      >
        <Typography variant={"subtitle18SemiBold"} as={"span"} color={"gray900"}>
          인터넷 연결을 확인해주세요
        </Typography>
        <Typography variant={"body16Medium"} as={"span"} color={"gray600"}>
          네트워크 연결 후 자동으로 복구돼요
        </Typography>
      </div>
    </div>
  );
}
