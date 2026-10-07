import { css } from "@emotion/react";
import { Lottie } from "@/lib/lottie-react-compat";

import loading from "@/assets/lottie/retropsect/list/loading.json";

export function LoadingSpinner() {
  return (
    <Lottie
      animationData={loading}
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20rem;
        height: auto;
      `}
    />
  );
}
