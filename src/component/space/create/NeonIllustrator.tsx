import { css, keyframes } from "@emotion/react";

import { Icon } from "@/component/common/Icon";

export function NeonIllustrator() {
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
  );
}
