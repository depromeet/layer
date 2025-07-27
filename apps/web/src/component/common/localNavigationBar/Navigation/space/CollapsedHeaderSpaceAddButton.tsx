import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function CollapsedHeaderSpaceAddButton() {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 0.4rem;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3.2rem;
          height: 3.2rem;
          padding: 0.7rem;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          border-radius: 0.8rem;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_plus" size={1.6} />
      </div>
    </div>
  );
}
