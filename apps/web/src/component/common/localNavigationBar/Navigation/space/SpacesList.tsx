import { css } from "@emotion/react";

import SpaceAddButton from "./SpaceAddButton";
import SpaceItem from "./SpaceItem";

export default function SpacesList() {
  return (
    <ul
      css={css`
        margin-top: 1rem;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      `}
    >
      {/* Mock data */}
      <SpaceItem />
      <SpaceItem />
      <SpaceAddButton />
    </ul>
  );
}
