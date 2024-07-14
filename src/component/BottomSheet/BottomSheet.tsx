import { css } from "@emotion/react";
import { Fragment, ReactElement, useEffect, useState } from "react";

import { MIN_Y } from "@/component/BottomSheet/BottomSheetOption.ts";
import { BottomSheetContent, BottomSheetHeader } from "@/component/BottomSheet/component";
import { useBottomSheet, useSetBottomSheet } from "@/hooks/useBottomSheet.ts";

export type BottomSheetType = {
  title?: string;
  contents: ReactElement;
  handler: boolean;
  sheetHeight?: number;
};

export function BottomSheet({ title, contents, handler = false, sheetHeight = 349 }: BottomSheetType) {
  const { sheet, content } = useSetBottomSheet({ handler, sheetHeight });
  const { bottomSheetState } = useBottomSheet();
  const [height, _] = useState(sheetHeight);

  useEffect(() => {
    sheet.current!.style.setProperty("transform", ``);
  }, [bottomSheetState]);

  return (
    <Fragment>
      <div
        css={css`
          position: fixed;
          width: 100%;
          height: 100vh;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          z-index: 10000;
          background-color: ${bottomSheetState ? `rgba(24, 24, 24, 60%)` : `transparent`};
          transition: 0.4s all;

          ${!bottomSheetState &&
          css`
            display: none;
          `}
        `}
      />
      <div
        ref={sheet}
        id="wrapper"
        css={css`
          display: flex;
          flex-direction: column;
          position: fixed;
          max-width: 48rem;
          width: 100%;
          top: calc(100% - ${MIN_Y / 10}rem);
          left: 50%;
          right: 0;
          border-top-left-radius: 1.6rem;
          border-top-right-radius: 1.6rem;
          box-shadow: 0 4rem 4rem rgba(0, 0, 0, 0.25);
          transition: transform 200ms ease-out;
          z-index: 10001;
          padding: 3rem 3rem 3.3rem 3rem;
          box-sizing: border-box;
          background-color: #fff;
          height: ${height}px;
          transform: translate3d(-50%, ${bottomSheetState ? `-${height}px` : `0%`}, 0);
        `}
      >
        <BottomSheetHeader title={title} handler={handler} />
        <BottomSheetContent ref={content}>{contents}</BottomSheetContent>
      </div>
    </Fragment>
  );
}
