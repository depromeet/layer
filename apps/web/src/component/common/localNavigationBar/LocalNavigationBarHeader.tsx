import { css } from "@emotion/react";

import { Icon } from "../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function LocalNavigationBarHeader() {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.2rem 1.6rem 1.8rem 2rem;
        border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
      `}
    >
      <Icon icon="ic_logo" size={6.36} style={{ cursor: "pointer" }} />
      <Icon icon="ic_arrow_back" size={1.35} style={{ cursor: "pointer" }} />
    </header>
  );
}
