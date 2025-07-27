import { css } from "@emotion/react";

import SpaceAddButton from "./SpaceAddButton";
import SpaceItem from "./SpaceItem";

interface SpacesListProps {
  isCollapsed: boolean;
}

export default function SpacesList({ isCollapsed }: SpacesListProps) {
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        align-items: ${isCollapsed ? "center" : "flex-start"};
        gap: 0.4rem;
        margin-top: 1rem;
        padding: 0;
      `}
    >
      {/* Mock data */}
      <SpaceItem isCollapsed={isCollapsed} />
      <SpaceItem isCollapsed={isCollapsed} />
      {!isCollapsed && <SpaceAddButton />}
    </ul>
  );
}
