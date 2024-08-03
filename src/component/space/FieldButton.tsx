import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { fieldMap } from "@/component/space/space.const";

type FieldButtonProps = {
  field: (typeof fieldMap)[keyof typeof fieldMap];
  isChecked?: boolean;
  onClick: () => void;
};

export function FieldButton({ field, onClick, isChecked = false }: FieldButtonProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        padding: 1rem 2rem 1rem 0.8rem;
        background-color: ${isChecked ? "#6C9CFA" : "#f6f8fa"};
        border-radius: 0.8rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${isChecked ? "#f6f8fa" : "#495057"};
        transition: 0.2s all;
      `}
    >
      <Icon
        icon={isChecked ? field.icon_white : field.icon_color}
        size={2.8}
        css={css`
          cursor: pointer;
          margin-right: 0.8rem;
        `}
      />
      {field.name}
    </div>
  );
}
