import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type TooltipProps = {
  message: string;
};

export function Tooltip({ message }: TooltipProps) {
  return (
    <div
      css={css`
        position: relative;
        background-color: ${DESIGN_SYSTEM_COLOR.theme3};
        padding: 1rem 1.4rem;
        border-radius: 1.2rem;
        width: max-content;
        ::after {
          top: 100%;
          left: 50%;
          border: solid transparent;
          content: "";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-top-color: #6c9cfa;
          border-width: 0.7rem;
          margin-left: 7rem;
        }
      `}
    >
      <Typography variant="CAPTION" color="white">
        {message}
      </Typography>
    </div>
  );
}
