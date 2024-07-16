import { css } from "@emotion/react";

import { BottomSheetType } from "@/component/BottomSheet/BottomSheet.tsx";
import Icon from "@/component/common/Icon/Icon.tsx";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";

export function BottomSheetHeader({ title, handler }: Pick<BottomSheetType, "title" | "handler">) {
  const { closeBottomSheet } = useBottomSheet();

  if (!title && !handler) return;
  return (
    <div
      css={css`
        position: relative;
        ${title &&
        css`
          border-top-left-radius: 1.2rem;
          border-bottom-right-radius: 1.2rem;
          padding-top: 1.2rem;
          padding-bottom: 1.4rem;
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
            cursor: ns-resize;
          `}
        />
      )}
      {title && (
        <div
          css={css`
            display: flex;
            align-items: center;

            svg:nth-of-type(1) {
              margin-left: auto;
              cursor: pointer;
            }
          `}
        >
          <span
            css={css`
              font-size: 2rem;
            `}
          >
            {title}
          </span>
          {/* FIXME: 아이콘 영역 */}
          <Icon icon={"ic_quit"} size={2.4} onClick={closeBottomSheet} />
        </div>
      )}
    </div>
  );
}
