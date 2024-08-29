import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type InfoBoxProps = {
  content: string;
  onClick: () => void;
};

export function InfoBox({ content, onClick }: InfoBoxProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        cursor: pointer;
        width: 100%;
        height: 4.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Typography variant="body16Medium">{content}</Typography>
      <Icon icon="ic_after" size={1.6} color="#424242" />
    </div>
  );
}
