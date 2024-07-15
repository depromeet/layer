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
    }
  `,
};
