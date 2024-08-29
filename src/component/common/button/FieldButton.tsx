import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { IconType } from "@/component/common/Icon/Icon";

type FieldButtonProps = {
  field: {
    name: string;
    icon_white?: IconType;
    icon_color?: IconType;
  };
  isChecked?: boolean;
  onClick: () => void;
};

export function FieldButton({ field, onClick, isChecked = false }: FieldButtonProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        width: fit-content;
        padding: ${field.icon_color && field.icon_white ? "0rem 2rem 0rem 1.4rem" : "0rem 2rem"};
        background-color: ${isChecked ? "#6C9CFA" : "#f6f8fa"};
        border-radius: 0.8rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${isChecked ? "#f6f8fa" : "#495057"};
        transition: 0.2s all;
        height: 4.8rem;
      `}
    >
      {field.icon_color && field.icon_white && (
        <Icon
          icon={isChecked ? field.icon_white : field.icon_color}
          size={2.8}
          css={css`
            cursor: pointer;
            margin-right: 0.8rem;
          `}
        />
      )}

      {field.name}
    </div>
  );
}
