import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { IconType } from "@/component/common/Icon/Icon";

type FieldButtonProps = {
  label: string;
  isChecked?: boolean;
  onClick: () => void;
};

export function FieldButton({ label, onClick, isChecked = false }: FieldButtonProps) {
  let iconName: IconType;

  // 아이콘 디자인 확정되면 수정
  switch (label) {
    case "기획":
    case "운영 및 관리":
    case "마케팅":
      iconName = isChecked ? "ic_earth_re" : "ic_earth";
      break;
    case "교육":
    case "데이터 분석":
      iconName = "ic_flask";
      break;
    default:
      iconName = "ic_space_chart";
  }

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
        icon={iconName}
        size={2.8}
        css={css`
          cursor: pointer;
          margin-right: 0.8rem;
        `}
      />
      {label}
    </div>
  );
}
