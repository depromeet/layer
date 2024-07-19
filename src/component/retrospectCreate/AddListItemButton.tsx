import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function AddListItemButton() {
  return (
    <button
      css={css`
        background-color: #f1f6ff;
        border-radius: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 4.8rem;
      `}
    >
      <Icon icon={"ic_plus"} size={"2.4rem"} color={DESIGN_SYSTEM_COLOR.theme} />
    </button>
  );
}
