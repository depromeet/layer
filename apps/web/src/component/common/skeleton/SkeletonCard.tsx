import { css } from "@emotion/react";
import { forwardRef } from "react";

import { Card } from "@/component/common/Card";
import { ANIMATION_CSS } from "@/style/common/animation";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export const SkeletonCard = forwardRef<HTMLDivElement, { height?: number }>(({ height = 20 }, ref) => {
  return (
    <div ref={ref}>
      <Card
        css={css`
          height: ${height}rem;
          background-color: ${DESIGN_TOKEN_COLOR.opacity12};
          ${ANIMATION_CSS.animatePulse}
        `}
      />
    </div>
  );
});

SkeletonCard.displayName = "SkeletonCard";
