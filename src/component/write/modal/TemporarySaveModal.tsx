import { css } from "@emotion/react";
import { useRef } from "react";

import { Button, ButtonProvider } from "@/component/common/button";
import { HeaderProvider } from "@/component/common/header";
import { ANIMATION } from "@/style/common/animation.ts";

type EntireListProps = {
  confirm: () => void;
  quit: () => void;
  rightButtonText?: string;
  leftButtonText?: string;
  title: string;
  content: string;
};

export function TemporarySaveModal({
  rightButtonText,
  leftButtonText,
  confirm,
  quit,
  title = "회고 작성을 멈출까요?",
  content = "작성중인 회고는 임시저장 되어요",
}: EntireListProps) {
  const containerRef = useRef(null);

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
        z-index: 10001;
      `}
      ref={containerRef}
      onClick={(e) => {
        if (containerRef.current === e.target) quit();
      }}
    >
      <div
        css={css`
          display: table;
          margin: auto;
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
            padding: 2.5rem 2rem;
            row-gap: 2rem;
            box-sizing: border-box;
          `}
        >
          <HeaderProvider>
            <HeaderProvider.Subject
              contents={title}
              css={css`
                font-size: 1.8rem;
              `}
            />
            <HeaderProvider.Description
              contents={content}
              css={css`
                font-size: 1.6rem;
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
              `}
              gradient={false}
            >
              <Button colorSchema={"gray"} onClick={() => quit()}>
                {leftButtonText ?? "취소"}
              </Button>
              <Button colorSchema={"primary"} onClick={() => confirm()}>
                {rightButtonText ?? "나가기"}
              </Button>
            </ButtonProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
