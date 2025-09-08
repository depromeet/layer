import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";

interface QuickActionButtonProps {
  action: string;
  // path: string; TODO: 추후에 경로 지정
}

export default function QuickActionButton({ action }: QuickActionButtonProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.6rem 1.2rem;
        background-color: white;
        border-radius: 9.9rem;
        cursor: pointer;
      `}
    >
      <Icon icon="ic_template" size={2.4} color="blue600" />
      <Typography color="gray800" variant="body13Bold">
        {action}
      </Typography>
    </div>
  );
}
