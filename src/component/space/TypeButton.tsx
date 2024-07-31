import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";

type TypeButtonProps = {
  isClicked?: boolean;
  label: string;
  onClick: () => void;
};

export function TypeButton({ isClicked = true, label, onClick }: TypeButtonProps) {
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
          icon="ic_human"
          size={4}
          color={isClicked ? "#f6f8fa" : "#6C9CFA"}
          css={css`
            cursor: pointer;
          `}
        />
        <Spacing size={2} />
        <div>{label}</div>
      </div>
    </div>
  );
}
