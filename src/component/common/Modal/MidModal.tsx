import { css } from "@emotion/react";
import { useRef } from "react";

import { Button, ButtonProvider } from "@/component/common/button";
import { HeaderProvider } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_TEXT } from "@/style/designTokens";

type MidModalProps = {
  title: string;
  content: string;
  leftText?: string;
  rightText?: string;
  leftFun?: () => void;
  rightFun?: () => void;
  onClose?: () => void;
};

export function MidModal({ title, content, leftText = "취소", rightText = "삭제", leftFun, rightFun, onClose }: MidModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      onClose?.();
    }
  };

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(6, 8, 12, 0.72);
        display: flex;
        justify-content: center;
        text-align: center;
        box-sizing: border-box;
        z-index: 99999;
      `}
      ref={containerRef}
      onClick={handleBackgroundClick}
    >
      <div
        css={css`
          width: 100%;
          height: fit-content;
          max-width: 46rem;
          max-height: 46rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: 0.4s all;
          animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
          padding: 2rem;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: white;
            border-radius: 1.2rem;
            padding: 3rem 2rem;
            row-gap: 2.8rem;
            box-sizing: border-box;
          `}
        >
          <HeaderProvider>
            <HeaderProvider.Subject
              contents={title}
              css={css`
                ${DESIGN_TOKEN_TEXT.subtitle16SemiBold}
              `}
            />
            <Spacing size={0.1} />
            <HeaderProvider.Description
              contents={content}
              css={css`
                font-size: 1.6rem;
                white-space: pre-line;
              `}
            />
          </HeaderProvider>
          <div
            css={css`
              width: 100%;
            `}
          >
            <ButtonProvider
              sort={"horizontal"}
              onlyContainerStyle={css`
                padding: 0;
                div:nth-of-type(1) {
                  display: none;
                }
              `}
            >
              <Button colorSchema={"gray"} onClick={leftFun}>
                {leftText}
              </Button>
              <Button colorSchema={"primary"} onClick={rightFun}>
                {rightText}
              </Button>
            </ButtonProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
