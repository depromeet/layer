import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function RetrospectOptions({
  isOptionsVisible,
  toggleOptionsVisibility,
  removeBtnClickFun,
  modifyBtnClickFun,
  optionsRef,
}: {
  isOptionsVisible: boolean;
  toggleOptionsVisibility: () => void;
  removeBtnClickFun: () => void;
  modifyBtnClickFun: () => void;
  optionsRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <Icon icon="ic_more" onClick={toggleOptionsVisibility} color={DESIGN_TOKEN_COLOR.gray600} />
      <AnimatePresence>
        {isOptionsVisible && (
          <motion.div
            ref={optionsRef} // ref 연
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            css={css`
              position: absolute;
              top: 100%;
              right: 0;
              background-color: white;
              border-radius: 1.2rem;
              z-index: 10;
              width: 16.5rem;
              height: 9.2rem;
              box-shadow: 0px 4px 12px 0px rgba(6, 8, 12, 0.12);
            `}
          >
            <button
              onClick={modifyBtnClickFun}
              css={css`
                display: block;
                height: 4.6rem;
                width: 100%;
                text-align: left;
                cursor: pointer;
              `}
            >
              <Typography
                variant="subtitle14SemiBold"
                color="gray800"
                css={css`
                  margin-left: 2rem;
                `}
              >
                회고 수정
              </Typography>
            </button>
            <button
              onClick={removeBtnClickFun}
              css={css`
                display: block;
                width: 100%;
                height: 4.6rem;
                text-align: left;
                cursor: pointer;
              `}
            >
              <Typography
                variant="subtitle14SemiBold"
                color="red500"
                css={css`
                  margin-left: 2rem;
                `}
              >
                회고 삭제
              </Typography>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
