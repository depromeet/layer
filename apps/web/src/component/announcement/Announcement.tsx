import { css } from "@emotion/react";
import Cookies from "js-cookie";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type AnnouncementProps = { title: string; content: React.ReactNode; onConfirm: () => void; sheetId: string };

export function Announcement({ title, content, onConfirm, sheetId }: AnnouncementProps) {
  const SHOW_ANNOUNCEMENT_KEY = "announcement-checked";

  const hideAnnouncement = Cookies.get(SHOW_ANNOUNCEMENT_KEY);

  if (hideAnnouncement) return;

  return (
    <BottomSheet
      sheetHeight={620}
      id={sheetId}
      contents={
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

          <ButtonProvider.Primary
            onClick={() => {
              Cookies.set(SHOW_ANNOUNCEMENT_KEY, new Date().toISOString(), { expires: 1 });
              onConfirm();
            }}
          >
            확인
          </ButtonProvider.Primary>
        </div>
      }
    />
  );
}
