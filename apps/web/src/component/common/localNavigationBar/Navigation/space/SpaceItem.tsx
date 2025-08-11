import { css } from "@emotion/react";

import { Icon } from "../../../Icon";
import { Typography } from "../../../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const IS_CURRENT_SPACE = false; // ! 임시변수, 아래의 TODO 완료 후 제거

interface SpaceItemProps {
  isCollapsed: boolean;
}

export default function SpaceItem({ isCollapsed }: SpaceItemProps) {
  // TODO(prgmr99): 현재 선택된 스페이스 전역상태 업데이트 로직 추가

  return (
    <li
      css={css`
        display: flex;
        justify-content: ${isCollapsed ? "center" : "flex-start"};
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: ${isCollapsed ? "4.8rem" : "5.6rem"};
        background-color: ${IS_CURRENT_SPACE ? DESIGN_TOKEN_COLOR.gray100 : "transparent"};
        padding: ${isCollapsed ? 0 : "0.7rem 0.4rem"};
        border-radius: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        }
      `}
    >
      {/* ---------- 스페이스 이미지/아이콘 ---------- */}
      <div
        css={css`
          width: 3.6rem;
          height: 3.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          padding: 0.6rem;
          border-radius: 50%;
        `}
      >
        <Icon icon="ic_management_white" size={2.4} />
      </div>

      {/* ---------- 스페이스 이름/설명 ---------- */}
      {!isCollapsed && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            flex: 0.9;
            min-width: 0;
          `}
        >
          <Typography
            variant="subtitle14SemiBold"
            color="gray900"
            css={css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            스페이스 이름 1
          </Typography>
          <Typography
            variant="body12Medium"
            color="gray600"
            css={css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            스페이스 설명
          </Typography>
        </div>
      )}
    </li>
  );
}
