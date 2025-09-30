import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "../Portal";
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import useToggleMenu from "@/hooks/useToggleMenu";

export function ToggleMenu({ children }: { children: React.ReactNode }) {
  const { toggleRef, isShowMenu, clickPosition } = useToggleMenu();

  return (
    <AnimatePresence>
      <Portal id="toggle-root">
        {isShowMenu && (
          <motion.div
            ref={toggleRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            css={css`
              position: absolute;
              top: ${clickPosition.top + clickPosition.height + 10}px;
              left: ${clickPosition.left}px;
              background-color: ${DESIGN_TOKEN_COLOR.gray00};
              border: none;
              border-radius: 1rem;
              box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
              z-index: 9999;
              width: 16.5rem;
              height: auto;
              padding: 0.3rem 2rem;
            `}
          >
            {children}
          </motion.div>
        )}
      </Portal>
    </AnimatePresence>
  );
}
