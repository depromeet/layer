import { css } from "@emotion/react";
import { useRef } from "react";

import { Icon } from "@/component/common/Icon";
import { ANIMATION } from "@/style/common/animation.ts";

type EntireListProps = {
  listData: string[];
  onClose: () => void;
};

export function EntireListModal({ listData, onClose }: EntireListProps) {
  const containerRef = useRef(null);
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        padding: 1.1rem;
        z-index: 99999;
      `}
      ref={containerRef}
      onClick={(e) => {
        if (containerRef.current === e.target) onClose();
      }}
    >
      <div
        css={css`
          width: 100%;
          height: fit-content;
          max-width: 46rem;
          border-radius: 1.2rem;
          background-color: white;
          padding: 1.3rem 0;
          transition: 0.4s all;
          animation: ${ANIMATION.FADE_IN_SCALE_UP} 0.4s ease-in-out;
        `}
      >
        <div
          css={css`
            display: flex;
            column-gap: 1.3rem;
            margin-bottom: 1rem;
            height: 2.5rem;
            width: 100%;
            justify-content: center;
            display: flex;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 1.6rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            `}
          >
            질문 전체보기
          </span>
          <Icon icon={"ic_arrow"} size={1.2} />
        </div>
        <div
          css={css`
            height: 100%;
            max-height: 31.7rem;
            overflow-y: auto;
            overflow-x: hidden;
          `}
        >
          {listData.map((item, index) => {
            return (
              <div
                key={index}
                css={css`
                  width: 100%;
                  padding: 1.4rem 2.8rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transition: 0.4s all;
                  cursor: pointer;

                  &:hover {
                    background-color: rgba(108, 156, 250, 0.15);
                  }
                `}
              >
                <span
                  css={css`
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-weight: 300;
                  `}
                >
                  {item}
                </span>
                <Icon
                  icon={"ic_move_arrow"}
                  size={1.5}
                  css={css`
                    margin-left: auto;
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
