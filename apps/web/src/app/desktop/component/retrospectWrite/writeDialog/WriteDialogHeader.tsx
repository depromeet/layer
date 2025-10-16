import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export function WriteDialogHeader() {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        gap: 0.4rem;
      `}
    >
      <Icon
        icon="ic_close"
        size={1.8}
        css={css`
          color: ${DESIGN_TOKEN_COLOR.gray600};
          margin: 0.3rem;
          cursor: pointer;
        `}
      />
      <Icon
        icon="ic_expand"
        size={1.8}
        css={css`
          margin-left: 0.4rem;
          color: ${DESIGN_TOKEN_COLOR.gray600};
          margin: 0.3rem;
          cursor: pointer;
        `}
      />
    </header>
  );
}
