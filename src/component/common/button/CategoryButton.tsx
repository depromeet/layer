import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { categoryMap } from "@/component/space/space.const";

type CategoryButtonProps = {
  isClicked?: boolean;
  category: (typeof categoryMap)[keyof typeof categoryMap];
  onClick: () => void;
};

export function CategoryButton({ isClicked = true, category, onClick }: CategoryButtonProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${isClicked ? "#6C9CFA" : "#f6f8fa"};
        border-radius: 1.2rem;
        cursor: pointer;
        flex: 1;
        padding: 4rem;
        transition: 0.2s all;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          color: ${isClicked ? "#f6f8fa" : "#495057"};
        `}
      >
        <Icon
          icon={isClicked ? category.icon_white : category.icon_color}
          size={4}
          color={isClicked ? "#f6f8fa" : "#6C9CFA"}
          css={css`
            cursor: pointer;
          `}
        />
        <Spacing size={2} />
        <div>{category.name}</div>
      </div>
    </div>
  );
}
