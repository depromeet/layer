import { css } from "@emotion/react";

import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type AnnouncementProps = { title: string; content: React.ReactNode; onConfirm: () => void };

export function Announcement({ title, content, onConfirm }: AnnouncementProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        overflow: hidden;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
        `}
      >
        <Icon icon={"ic_letter"} size={4.8} />
        <Typography variant={"title18Bold"} color={"gray900"}>
          {title}
        </Typography>
      </div>
      <div
        css={css`
          overflow-y: auto;
          ::-webkit-scrollbar {
            display: block;
          }
        `}
      >
        {content}
      </div>

      <ButtonProvider.Primary onClick={onConfirm}>확인</ButtonProvider.Primary>
    </div>
  );
}
