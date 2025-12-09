import { css } from "@emotion/react";

import { IconButton } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ANIMATION } from "@/style/common/animation";
import { useToast } from "@/hooks/useToast";
import { useBridge } from "@/lib/provider/bridge-provider";
import { useApiGetUser } from "@/hooks/api/auth/useApiGetUser";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { shareKakaoWeb } from "@/utils/kakao/sharedKakaoLink";
import { encryptId } from "@/utils/space/cryptoKey";

type InviteMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  spaceId: string;
};

export function InviteMemberModal({ isOpen, onClose, spaceId }: InviteMemberModalProps) {
  const { toast } = useToast();
  const { bridge } = useBridge();
  const { data: userData } = useApiGetUser();
  const { data: spaceInfo } = useApiGetSpace(spaceId);
  const encryptedId = encryptId(spaceId);
  const inviteLink = `${window.location.protocol}//${window.location.host}/space/join/${encryptedId}`;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShareKakao = async () => {
    if (bridge.isWebViewBridgeAvailable) {
      await bridge.sendShareToKakao({
        content: {
          title: `${userData?.name}님의 회고 초대장`,
          description: `함께 회고해요! ${userData?.name}님이 팀 레이어 스페이스에 초대했어요`,
          imageUrl: "https://kr.object.ncloudstorage.com/layer-bucket/small_banner.png",
          link: {
            mobileWebUrl: inviteLink,
            webUrl: inviteLink,
          },
        },
        buttons: [
          {
            title: "초대 받기",
            link: {
              mobileWebUrl: inviteLink,
              webUrl: inviteLink,
            },
          },
        ],
      });
    } else {
      shareKakaoWeb(
        inviteLink,
        `${userData?.name}님의 회고 초대장.`,
        `함께 회고해요! ${userData?.name}님이 ${spaceInfo?.name} 스페이스에 초대했어요`,
      );
    }
    onClose();
  };

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("링크 복사가 완료되었어요!");
      onClose();
    } catch (e) {
      toast.error("링크 복사에 실패했어요!");
    }
  };

  if (!isOpen) return null;

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(6, 8, 12, 0.32);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
        `}
        onClick={handleBackgroundClick}
      >
        <div
          css={css`
            width: 100%;
            max-width: 31.5rem;
            background-color: ${DESIGN_TOKEN_COLOR.white};
            border-radius: 1.2rem;
            box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            margin: 2rem;
            animation: ${ANIMATION.FADE_IN} 0.3s ease-out;
          `}
        >
          {/* 헤더 */}
          <header
            css={css`
              display: flex;
              align-items: center;
              justify-content: end;
              padding: 1rem;
            `}
          >
            <button
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3.2rem;
                height: 3.2rem;
                border: none;
                background: transparent;
                border-radius: 0.4rem;
                cursor: pointer;
                transition: background-color 0.2s ease;

                &:hover {
                  background-color: ${DESIGN_TOKEN_COLOR.gray100};
                }
              `}
              onClick={onClose}
            >
              <Icon icon="ic_close" size={2.4} color={DESIGN_TOKEN_COLOR.gray900} />
            </button>
          </header>

          {/* 콘텐츠 */}
          <div
            css={css`
              flex: 1;
              padding: 0 2.4rem 1.2rem 2.4rem;
              overflow-y: auto;
              display: flex;
              flex-direction: column;
              gap: 2rem;
              align-items: center;
              margin-bottom: 1.8rem;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 1.2rem;
                align-items: center;
              `}
            >
              <Typography variant="title18Bold" color="gray900">
                팀원을 추가 하시겠어요?
              </Typography>
              <Typography variant="subtitle16SemiBold" color="gray600">
                링크를 복사하여 팀원을 초대할 수 있어요
              </Typography>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                width: 100%;
              `}
            >
              <IconButton
                onClick={handleShareKakao}
                icon="ic_kakao"
                css={css`
                  background-color: #ffe400;
                  color: #000000;
                  transition: all 0.5s ease;
                  transition-delay: 0.5s;
                `}
              >
                카카오톡 전달
              </IconButton>
              <IconButton
                onClick={handleCopyClipBoard}
                icon="ic_copy"
                color="#000000"
                css={css`
                  background-color: #f1f5f3;
                  color: #000000;
                  transition: all 0.5s ease;
                  transition-delay: 0.5s;
                `}
              >
                초대링크 복사
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
