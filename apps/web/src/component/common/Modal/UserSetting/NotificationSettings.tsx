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

export function NotificationSettings() {
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

  const { mutate: patchMarketingAgreement, isPending } = useMutation({
    mutationFn: async ({ agreed }: { agreed: boolean }) => {
      const res = await api.patch<MemberAgreement>(`/api/member/agreements/marketing`, { agreed });
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.agreements });
      closeDesktopModal();
    },
    onError: (error) => {
      console.error(error);
      toast.error("서버 에러가 발생했어요!");
    },
  });

  /** 마케팅 동의는 한 번도 응답하지 않으면 목록에서 빠지므로, 없으면 off로 봐요. */
  const savedMarketingAgreed = data?.agreements.find((agreement) => agreement.agreementType === "MARKETING")?.agreed ?? false;
  const [marketingAgreed, setMarketingAgreed] = useState(savedMarketingAgreed);

  useEffect(() => {
    setMarketingAgreed(savedMarketingAgreed);
  }, [savedMarketingAgreed]);

  const isUnchanged = marketingAgreed === savedMarketingAgreed;

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
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
        <Switch checked={marketingAgreed} onChange={setMarketingAgreed} aria-label="마케팅 정보 수신 설정" />
      </div>
      <Typography
        variant="body14Medium"
        color="gray600"
        css={css`
          display: block;
          margin-top: 0.8rem;
          white-space: pre-line;
        `}
      >
        {"주요 공지, 업데이트 및 이벤트 소식을 이메일로 알려드려요.\n카카오톡 알림 메세지는 카카오톡에서 수신 동의 여부를 설정할 수 있습니다."}
      </Typography>

      <ButtonProvider
        sort="horizontal"
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Gray onClick={closeDesktopModal}>취소</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={() => patchMarketingAgreement({ agreed: marketingAgreed })} disabled={isUnchanged || isPending}>
          완료
        </ButtonProvider.Primary>
      </ButtonProvider>
    </section>
  );
}
