import { css, Interpolation, Theme } from "@emotion/react";
import { ReactElement, useEffect, useState } from "react";

import { MIN_Y } from "@/component/BottomSheet/BottomSheetOption.ts";
import { BottomSheetContent, BottomSheetHeader } from "@/component/BottomSheet/component";
import { Portal } from "@/component/common/Portal/Portal.tsx";
import { useBottomSheet, useSetBottomSheet } from "@/hooks/useBottomSheet.ts";

export type BottomSheetType = {
  id: string;
  title?: string;
  contents: ReactElement;
  handler?: boolean;
  quitButton?: boolean;
  sheetHeight?: number;
  onlyContentStyle?: Interpolation<Theme>;
};

export function BottomSheet({ id, title, contents, handler = false, quitButton = true, sheetHeight = 349, onlyContentStyle }: BottomSheetType) {
  const { sheet, content } = useSetBottomSheet({ handler, sheetHeight });
  const { bottomSheetState } = useBottomSheet();
  const isVisible = bottomSheetState.visible && id === bottomSheetState.id;
  const [height, _] = useState(sheetHeight);

  useEffect(() => {
    sheet.current!.style.setProperty("transform", ``);
  }, [isVisible]);

  return (
    <Portal id={"bottom-sheet-root"}>
      <div
        id={id}
        css={css`
          position: fixed;
          width: 100%;
          height: 100vh;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          background-color: ${isVisible ? `rgba(24, 24, 24, 60%)` : `transparent`};
          transition: 0.4s all;
          z-index: 10001;

          ${!isVisible &&
          css`
            display: none;
          `}
        `}
      />
      <div
        ref={sheet}
        id="wrapper"
        css={[
          css`
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
            z-index: 100000000;
            padding: 2rem;
            box-sizing: border-box;
            background-color: #fff;
            height: ${height}px;
            transform: translate3d(-50%, ${isVisible ? `-${height}px` : `0%`}, 0);
          `,
          onlyContentStyle,
        ]}
      >
        <BottomSheetHeader title={title} handler={handler} quitButton={quitButton} />
        <BottomSheetContent ref={content}>{contents}</BottomSheetContent>
      </div>
    </Portal>
  );
}
