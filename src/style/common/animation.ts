import { css, keyframes } from "@emotion/react";

export const ANIMATION = {
  FADE_IN: keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;

    }
  `,
  FADE_OUT: keyframes`
      from {
        opacity: 1;
        transform: translateY(0);      
    }
    to {
        opacity: 0;
        transform: translateY(-1.5rem);  

    }
  `,
  TRIGGER: keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }`,
  ZOOM_IN: keyframes`
    0% {
      opacity: 0.3;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `,

  FADE_UP: keyframes`
      0% {
          opacity: 40%;
          transform: translate3d(0, 5%, 0);
      }
      50% {
          opacity: 60%;
          transform: translateZ(10);
      }
      70% {
          opacity: 80%;
          transform: translateZ(30);
      }
      100% {
          opacity: 100%;
          transform: translateZ(50);
      }`,

  FADE_DOWN: keyframes`
      0% {
          opacity: 100%;
        transform: translateZ(50);
      }
      50% {
          opacity: 60%;
          transform: translateZ(30);
      }
      70% {
          opacity: 40%;
          transform: translateZ(10);
      }
      100% {
          opacity: 10%;
        transform: translate3d(0, 10%, 0);
      }`,

  FADE_IN_SCALE_UP: keyframes`
      0% {
        width: 40%;
        opacity: 40%;
      }
      100% {
        width: 100%;
        opacity: 100%;  
      }`,

  PULSE: keyframes`
    50% {
      opacity: 0.5;
    }
  `,

  FLOAT_UP: keyframes`
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1rem);
    }
    100% {
      transform: translateY(0);
    }
  `,

  FLOAT_DOWN: keyframes`
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(1rem);
    }
    100% {
      transform: translateY(0);
    }
  `,
};

export const ANIMATION_CSS = {
  animatePulse: css`
    animation: ${ANIMATION.PULSE} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  `,
};
