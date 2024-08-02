import { keyframes } from "@emotion/react";

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
        opacity: 1;
    }
    to {
        opacity: 1;
    }`,

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

  FADE_IN_SCALE_UP: keyframes`
      0% {
        width: 40%;
        opacity: 40%;
      }
      100% {
        width: 100%;
        opacity: 100%;  
      }`,
};
