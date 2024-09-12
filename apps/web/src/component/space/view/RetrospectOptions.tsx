import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { RetrospectStatus } from "@/types/retrospect";
import React from "react";

export function RetrospectOptions({
  retrospectStatus,
  isOptionsVisible,
  toggleOptionsVisibility,
  removeBtnClickFun,
  modifyBtnClickFun,
  closeBtnClickFun,
  optionsRef,
}: {
  retrospectStatus: RetrospectStatus;
  isOptionsVisible: boolean;
  toggleOptionsVisibility: () => void;
  removeBtnClickFun: () => void;
  modifyBtnClickFun: () => void;
  closeBtnClickFun?: () => void;
  optionsRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      css={css`
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <Icon icon="ic_more" onClick={toggleOptionsVisibility} color={DESIGN_TOKEN_COLOR.gray600} />
      <AnimatePresence>
        {isOptionsVisible && (
          <motion.div
            ref={optionsRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            css={css`
              position: absolute;
              top: 35%;
              right: 0;
              background-color: white;
              border-radius: 1.2rem;
              z-index: 10;
              width: 16.5rem;
              min-height: 9.2rem;
              height: fit-content;
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
                정보 수정
              </Typography>
            </button>
            {retrospectStatus === "PROCEEDING" && (
              <button
                onClick={closeBtnClickFun}
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
                  회고 마감
                </Typography>
              </button>
            )}
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
    </div>
  );
}
