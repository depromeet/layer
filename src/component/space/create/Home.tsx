import { css, keyframes } from "@emotion/react";
import { Fragment } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";

export function Home({ onNext }: { onNext: () => void }) {
  const neonFlicker = keyframes`
      0%, 100% {
        opacity: 1;
        filter: drop-shadow(0 0 8px rgba(255, 223, 0, 0.9))
        drop-shadow(0 0 12px rgba(255, 223, 0, 0.8))
        drop-shadow(0 0 20px rgba(255, 223, 0, 1))
        brightness(1.3);
      }
      50% {
        opacity: 0.75;
        filter: drop-shadow(0 0 4px rgba(255, 223, 0, 0.6))
        drop-shadow(0 0 8px rgba(255, 223, 0, 0.5))
        drop-shadow(0 0 14px rgba(255, 223, 0, 0.8))
        brightness(1.1);
      }
    `;

  return (
    <Fragment>
      <Spacing size={2.9} />
      <Header title={`회고 스페이스를\n만들어볼까요?`} contents="회고를 진행하기 위한 공간이 필요해요" theme="white" />
      <div
        css={css`
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 100%;
          `}
        >
          <Icon icon={"neon_container"} size={26} />
          <div
            css={css`
              width: 100%;
              height: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);

              svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }

              #neon_circle {
                top: 30%;
                animation: ${neonFlicker} 1.5s infinite alternate;
              }
              #neon_square {
                top: 70%;
                left: 27%;
                animation: ${neonFlicker} 1.8s infinite alternate;
              }
              #neon_pencil {
                top: 68%;
                left: 73%;
                animation: ${neonFlicker} 2s infinite alternate;
              }
              #empty_sign {
                top: 56%;
              }
            `}
          >
            <Icon id="neon_circle" icon={"neon_circle"} size={9.5} />
            <Icon id="neon_pencil" icon={"neon_pencil"} size={11.7} />
            <Icon id="neon_square" icon={"neon_square"} size={12} />
            <Icon id="empty_sign" icon={"empty_sign"} size={16} />
          </div>
        </div>
      </div>
      <ButtonProvider>
        <ButtonProvider.Gray onClick={onNext}>
          <Typography variant="B1">시작하기</Typography>
        </ButtonProvider.Gray>
      </ButtonProvider>
    </Fragment>
  );
}
