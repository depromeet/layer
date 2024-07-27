import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";

export function ItemsButton({ ...props }) {
  return (
    <button
      css={css`
        min-height: 4.2rem;
        min-width: 16.4rem;
        padding: 0.9rem 2.6rem;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1.2rem;

        background-color: #f6f8fa;
        border-radius: 1.2rem;
      `}
      {...props}
    >
      <span
        css={css`
          color: #7e7c7c;
          font-size: 1.6rem;
        `}
      >
        질문 전체보기
      </span>
      <Icon icon={"ic_arrow"} size={1.2} />
    </button>
  );
}
