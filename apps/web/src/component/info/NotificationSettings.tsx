import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { api } from "@/api";
import { ButtonProvider } from "@/component/common/button";
import { Switch } from "@/component/common/switch";
import { Typography } from "@/component/common/typography";
import { userQueryKeys } from "@/hooks/api/user/queryKeys";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useToast } from "@/hooks/useToast";
import { MemberAgreement, MemberAgreementsResponse } from "@/types/agreement";
import { getDeviceType } from "@/utils/deviceUtils";

const DESCRIPTION =
  "주요 공지, 업데이트 및 이벤트 소식을 이메일로 알려드려요.\n카카오톡 알림 메세지는 카카오톡에서 수신 동의 여부를 설정할 수 있습니다.";

/**
 * 데스크탑은 모달 안에서 취소/완료로 저장하고, 모바일은 별도 화면이라 토글 즉시 저장해요.
 */
export function NotificationSettings() {
  const { isDesktop } = getDeviceType();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { close: closeDesktopModal } = useDesktopBasicModal();

  const { data } = useQuery({
    queryKey: userQueryKeys.agreements,
    queryFn: async () => {
      const res = await api.get<MemberAgreementsResponse>(`/api/member/agreements`);
      return res.data;
    },
  });

  /** 마케팅 동의는 한 번도 응답하지 않으면 목록에서 빠지므로, 없으면 off로 봐요. */
  const savedMarketingAgreed = data?.agreements.find((agreement) => agreement.agreementType === "MARKETING")?.agreed ?? false;

  const [marketingAgreed, setMarketingAgreed] = useState(savedMarketingAgreed);

  const { mutate: patchMarketingAgreement, isPending } = useMutation({
    mutationFn: async ({ agreed }: { agreed: boolean }) => {
      const res = await api.patch<MemberAgreement>(`/api/member/agreements/marketing`, { agreed });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.agreements });

      if (isDesktop) {
        closeDesktopModal();
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("서버 에러가 발생했어요!");
      setMarketingAgreed(savedMarketingAgreed);
    },
  });

  const handleToggle = (agreed: boolean) => {
    setMarketingAgreed(agreed);

    if (!isDesktop) {
      patchMarketingAgreement({ agreed });
    }
  };

  useEffect(() => {
    setMarketingAgreed(savedMarketingAgreed);
  }, [savedMarketingAgreed]);

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: ${isDesktop ? "0" : "1.2rem 0"};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.6rem;
        `}
      >
        <Typography variant="body15Normal" color="gray900">
          마케팅 정보 수신 설정
        </Typography>
        <Switch checked={marketingAgreed} onChange={handleToggle} disabled={isPending} aria-label="마케팅 정보 수신 설정" />
      </div>
      <Typography
        variant="body14Medium"
        color="gray600"
        css={css`
          display: block;
          margin-top: 1.6rem;
          white-space: pre-line;
        `}
      >
        {DESCRIPTION}
      </Typography>

      {isDesktop && (
        <ButtonProvider
          sort="horizontal"
          onlyContainerStyle={css`
            padding: 0;
          `}
        >
          <ButtonProvider.Gray onClick={closeDesktopModal}>취소</ButtonProvider.Gray>
          <ButtonProvider.Primary
            onClick={() => patchMarketingAgreement({ agreed: marketingAgreed })}
            disabled={marketingAgreed === savedMarketingAgreed || isPending}
          >
            완료
          </ButtonProvider.Primary>
        </ButtonProvider>
      )}
    </section>
  );
}
