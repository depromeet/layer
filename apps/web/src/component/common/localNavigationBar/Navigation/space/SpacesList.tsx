import { css } from "@emotion/react";

import SpaceAddButton from "./SpaceAddButton";
import SpaceItem from "./SpaceItem";
import { useNavigation } from "../../context/NavigationContext";

export default function SpacesList() {
  const { isCollapsed } = useNavigation();

  // TODO(prgmr99): 실제 스페이스 목록 가져오도록 구현

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
      <SpaceItem />
      <SpaceItem />
      <SpaceAddButton />
    </ul>
  );
}
