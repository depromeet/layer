import { keyframes, css } from "@emotion/react";
import { motion } from "framer-motion";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const slideUpDown = keyframes`
  0% {
    transform: translateY(-0.5rem);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-0.5rem);
  }
`;

export function EmptySpaceTooltip() {
  return (
    <motion.div
      role="tooltip"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      css={css`
        width: 23rem;
        height: 3.7rem;
        transform: translateX(-50%);
        position: absolute;
        top: 7rem;
        left: 0.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.blue600};
        margin-top: 1rem;
        padding-top: 0.9rem;
        margin-left: 1rem;
        border-radius: 0.8rem;
        white-space: nowrap;
        text-align: center;
        animation: ${slideUpDown} 3s infinite;
        ::after {
          content: "";
          position: absolute;
          top: -0.5rem;
          left: 1.5rem;
          border-width: 0 0.5rem 0.5rem 0.5rem;
          border-style: solid;
          border-color: transparent transparent ${DESIGN_TOKEN_COLOR.blue600} transparent;
        }
      `}
    >
      <Typography variant="body12SemiBold" color="gray00">
        스페이스를 생성하고 회고를 진행해 보세요!
      </Typography>
    </motion.div>
  );
}
