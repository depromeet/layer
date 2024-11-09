import { css } from "@emotion/react";
import Hotjar from "@hotjar/browser";
import { PATHS } from "@layer/shared";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Announcement } from "@/component/announcement/Announcement";
import { Modal } from "@/component/common/Modal";
import { Typography } from "@/component/common/typography";
import { PreventExternalBrowser } from "@/helper/preventExternalBrowser.tsx";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useToast } from "@/hooks/useToast";
import ChannelService from "@/lib/channel-talk/service";
import { useBridge } from "@/lib/provider/bridge-provider";

const siteId = import.meta.env.VITE_HOTJAR_KEY as number;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION as number;
const SHEET_ID = "announcement";

export default function GlobalLayout() {
  const { safeAreaHeight } = useBridge();
  const location = useLocation();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { toast } = useToast();

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
    openBottomSheet({ id: SHEET_ID });
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith(PATHS.myInfo())) {
      ChannelService.showChannelButton();
    } else {
      ChannelService.hideChannelButton();
    }
  }, [location]);

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
      <Announcement
        sheetId={SHEET_ID}
        onConfirm={closeBottomSheet}
        title="인프라 이전 안내"
        content={
          <>
            <Typography
              as="p"
              variant={"body16Medium"}
              color={"gray600"}
              css={css`
                white-space: pre-wrap;
              `}
            >
              {`안녕하세요, 레이어 서비스입니다.
항상 저희 서비스를 이용해 주셔서 감사드립니다.

서비스 품질 향상을 위한 인프라 이전을 진행하고자 하오니 잠시 양해를 부탁드립니다.
작업 진행 시간 동안 서비스가 접속이 되지 않거나 느려지는 현상이 있을 수 있으니 이용에 참고하시기 바랍니다.

1. 점검 시간

    2024년 11월 10일(일) 13:00 ~ 22:00
    ※ 모든 시간은 한국시간 기준입니다.
    ※ 작업 진행상황에 따라 일정은 변경될 수 있습니다.

2. 대상 서비스

    레이어 서비스

해당 기간동안 궁금하신 점은`}
            </Typography>
            <Typography
              variant={"body16Medium"}
              color={"blue500"}
              css={css`
                text-decoration: underline;
                cursor: pointer;
              `}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("gentlemonster77@likelion.org");
                  toast.success("이메일이 클립보드에 복사되었습니다");
                } catch (e) {
                  toast.success("다시 시도해주세요");
                }
              }}
            >
              gentlemonster77@likelion.org
            </Typography>
            <Typography
              as="p"
              variant={"body16Medium"}
              color={"gray600"}
              css={css`
                white-space: pre-wrap;
              `}
            >
              {`로 문의를 주시면 빠르게 확인 후 순차적으로 답변 드리겠습니다.

이용에 불편을 드려 죄송합니다.
보다 안정적인 서비스를 제공하기 위해 노력하는 레이어가 되겠습니다.

감사합니다.`}
            </Typography>
          </>
        }
      />
      <Modal />
      <PreventExternalBrowser>
        <Outlet />
      </PreventExternalBrowser>
    </div>
  );
}
