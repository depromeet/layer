import { css } from "@emotion/react";

import { BottomSheetType } from "@/component/BottomSheet/BottomSheet.tsx";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function BottomSheetHeader({ title, handler, quitButton }: Pick<BottomSheetType, "title" | "handler" | "quitButton">) {
  const { closeBottomSheet } = useBottomSheet();

  if (!title && !handler && !quitButton) return;
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        ${title &&
        css`
          border-top-left-radius: 1.2rem;
          border-bottom-right-radius: 1.2rem;
        `}
      `}
    >
      {handler && (
        <div
          css={css`
            position: absolute;
            left: 50%;
            top: -1.7rem;
            transform: translate3d(-50%, -50%, 0);
            width: 3.6rem;
            height: 0.5rem;
            border-radius: 5rem;
            background-color: rgba(60, 60, 67, 0.3);
            margin: auto;
            margin-top: 1.2rem;
            margin-bottom: 1.4rem;
            cursor: ns-resize;
          `}
        />
      )}
      {title && (
        <div
          css={css`
            display: flex;
            align-items: center;
            width: 100%;
            position: absolute;
            justify-content: center;
            z-index: 10;

            svg:nth-of-type(1) {
              margin-left: auto;
              cursor: pointer;
            }
          `}
        >
          <Typography variant={"title18Bold"} color={"gray900"}>
            {title}
          </Typography>
        </div>
      )}
      {quitButton && (
        <button
          onClick={closeBottomSheet}
          css={css`
            margin-left: auto;
            z-index: 11;
          `}
        >
          <Icon icon={"ic_quit"} size={2.4} color={DESIGN_SYSTEM_COLOR.dark} />
        </button>
      )}
    </div>
  );
}
