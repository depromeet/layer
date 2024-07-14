import { css } from "@emotion/react";
import { forwardRef, PropsWithChildren } from "react";

export const BottomSheetContent = forwardRef<HTMLDivElement, PropsWithChildren>(function Content({ children }, ref) {
  return (
    <div
      ref={ref}
      css={css`
        -webkit-overflow-scrolling: touch;
        z-index: 999;
        background-color: inherit;
        position: relative;
        height: 100%;
        overflow-y: auto;

        ::-webkit-scrollbar {
          width: 0.8rem;
          height: 0.8rem;
          cursor: pointer;
        }

        ::-webkit-scrollbar-thumb {
          height: 5.6rem;
          border-radius: 0.8rem;
          background-clip: content-box;
          background-color: rgba(0, 0, 0, 0.1);
        }
      `}
    >
      {children}
    </div>
  );
});
