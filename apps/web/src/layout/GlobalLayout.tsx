import { css } from "@emotion/react";
import Hotjar from "@hotjar/browser";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Modal } from "@/component/common/Modal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useToast } from "@/hooks/useToast";
import { useBridge } from "@/lib/provider/bridge-provider";

const siteId = import.meta.env.VITE_HOTJAR_KEY as number;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION as number;

const SHEET_ID = "ANNOUNCEMENT";
const SHOW_ANNOUNCEMENT_KEY = "announce-9-12-checked";

export default function GlobalLayout() {
  const { safeAreaHeight } = useBridge();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
    openBottomSheet({ id: SHEET_ID });
  }, []);

  const hideAnnouncement = Cookies.get(SHOW_ANNOUNCEMENT_KEY);
  return (
    <div
      css={css`
        width: 100vw;
        max-width: 48rem;
        min-height: 100dvh;
        box-shadow:
          0 0.1rem 0.3rem 0 rgb(0 0 0 / 0.1),
          0 0.1rem 0.2rem -0.1rem rgb(0 0 0 / 0.1);
        margin: 0 auto;

        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        ${safeAreaHeight && { height: `calc(100dvh-${safeAreaHeight * 2}px)` }}
      `}
    >
      {!hideAnnouncement && (
        <BottomSheet
          id={SHEET_ID}
          contents={
            <Announcement
              onConfirm={() => {
                Cookies.set(SHOW_ANNOUNCEMENT_KEY, "true");
                closeBottomSheet();
              }}
            />
          }
          sheetHeight={620}
        />
      )}
      <Modal />
      <Outlet />
    </div>
  );
}

const Announcement = ({ onConfirm }: { onConfirm: () => void }) => {
  const { toast } = useToast();
  const EMAIL = "gentlemonster77@likelion.org";

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
          {"데이터 손실 안내"}
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
        <Typography
          as="p"
          variant={"body16Medium"}
          color={"gray600"}
          css={css`
            white-space: pre-wrap;
          `}
        >
          {`안녕하세요. Layer 입니다.

현재 시스템 오류로 인해 일부 데이터가 손실되는 
문제가 발생하였습니다. 이에 따라 회원님의 
일부 정보가 정상적으로 표시되지 않거나 삭제될 수 
있음을 안내드립니다.

저희는 최대한 빠르게 복구 작업을 진행 중이며, 
일부 데이터는 복구가 어려울 수 있다는 점 양해 부탁드립니다. 향후 이러한 문제가 재발하지 않도록 
철저한 대책을 마련하겠습니다.

이용에 불편을 드린 점 진심으로 사과드리며, 
추가 문의 사항은 고객센터 이메일로 
연락 주시기 바랍니다.

[고객센터 이메일]`}
        </Typography>
        <div
          css={css`
            display: flex;
            gap: 1rem;
          `}
        >
          <Typography variant={"body16Medium"} color={"gray600"}>
            이메일 :
          </Typography>
          <Typography
            variant={"body16Medium"}
            color={"blue500"}
            css={css`
              text-decoration: underline;
            `}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(EMAIL);
                toast.success("이메일이 클립보드에 복사되었습니다");
              } catch (e) {
                toast.success("다시 시도해주세요");
              }
            }}
          >
            {EMAIL}
          </Typography>
        </div>
        <Spacing size={3} />
        <Typography variant={"body16Medium"} color={"gray600"}>
          감사합니다.
        </Typography>
      </div>

      <ButtonProvider.Primary onClick={onConfirm}>확인</ButtonProvider.Primary>
    </div>
  );
};
