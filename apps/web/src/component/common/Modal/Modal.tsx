import { css } from "@emotion/react";
import { useRef } from "react";

import { Button, ButtonProvider } from "@/component/common/button";
import { HeaderProvider } from "@/component/common/header";
import { Portal } from "@/component/common/Portal";
import { Typography } from "@/component/common/typography";
import { useModal } from "@/hooks/useModal";
import { ANIMATION } from "@/style/common/animation.ts";

export function Modal() {
  const { modalDataState, close } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  if (!modalDataState.isOpen) return null;
  const { type = "confirm", buttonText = [], autoClose = true } = modalDataState.options || {};

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999;
        `}
        ref={containerRef}
        onClick={(e) => {
          if (containerRef.current === e.target) close();
        }}
      >
        <div
          css={css`
            display: table;
            margin: auto;
            width: 100%;
            height: fit-content;
            max-width: 31.5rem;
            max-height: 46rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: 0.4s all;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;

            // 액션 버튼들을 오버라이드 하는 경우에는 보통 소셜 로그인과 같은 다양한 버튼 셋들이 들어오므로, 더 넓은 너비로 지정해줘요
            ${modalDataState.overrideActionElements &&
            css`
              max-width: 36.3rem;
            `}
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
              border-radius: 1.6rem;
              padding-top: 3rem;
              padding-inline: 2rem;
              padding-bottom: 2rem;
              row-gap: 2rem;
              box-sizing: border-box;
              text-align: center;
            `}
          >
            <HeaderProvider
              onlyContainerStyle={css`
                row-gap: 1.2rem;
                padding-bottom: 0.8rem;
              `}
            >
              <HeaderProvider.Subject contents={modalDataState.title} type="modal" />
              <HeaderProvider.Description contents={modalDataState.contents} />
            </HeaderProvider>
            {modalDataState.overrideActionElements ?? (
              <div
                css={css`
                  width: 100%;
                `}
              >
                {
                  {
                    confirm: (
                      <ButtonProvider
                        sort={"horizontal"}
                        onlyContainerStyle={css`
                          padding: 0;
                        `}
                        gradient={false}
                      >
                        <Button
                          colorSchema={"gray"}
                          onClick={() => {
                            modalDataState.onClose?.();
                            autoClose && close();
                          }}
                        >
                          <Typography color={"gray800"} variant={"subtitle16SemiBold"}>
                            {buttonText.length ? buttonText[0] : "아니요"}
                          </Typography>
                        </Button>
                        <Button
                          colorSchema={"primary"}
                          onClick={() => {
                            modalDataState.onConfirm?.();
                            autoClose && close();
                          }}
                        >
                          <Typography color={"white"} variant={"subtitle16SemiBold"}>
                            {buttonText.length ? buttonText[1] : "네"}
                          </Typography>
                        </Button>
                      </ButtonProvider>
                    ),
                    alert: (
                      <ButtonProvider
                        sort={"horizontal"}
                        onlyContainerStyle={css`
                          padding: 0;
                        `}
                        gradient={false}
                      >
                        <Button
                          colorSchema={"primary"}
                          onClick={() => {
                            modalDataState.onConfirm?.();
                            autoClose && close();
                          }}
                        >
                          <Typography color={"white"} variant={"subtitle16SemiBold"}>
                            {buttonText.length ? buttonText[0] : "확인"}
                          </Typography>
                        </Button>
                      </ButtonProvider>
                    ),
                  }[type]
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
