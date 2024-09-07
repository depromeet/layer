import { css } from "@emotion/react";

import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type DividerProps = {
  direction: "horizontal" | "vertical";
  margin?: number;
  thickness?: number;
  color?: keyof typeof DESIGN_SYSTEM_COLOR;
};

export function Divider({ direction, margin = 2, thickness = 0.1, color = "lightGrey4" }: DividerProps) {
  const commonStyles = css`
    background-color: ${DESIGN_SYSTEM_COLOR[color]};
    border: none;
  `;

  const horizontalStyles = css`
    height: ${thickness}rem;
    margin: ${margin}rem 0;
  `;

  const verticalStyles = css`
    width: ${thickness}rem;
    height: 100%;
    margin: 0 ${margin}rem;
  `;

  return <hr css={[commonStyles, direction === "horizontal" ? horizontalStyles : verticalStyles]} />;
}
