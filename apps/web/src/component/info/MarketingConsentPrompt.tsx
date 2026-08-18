import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { api } from "@/api";
import { Typography } from "@/component/common/typography";
import { userQueryKeys } from "@/hooks/api/user/queryKeys";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { MemberAgreement } from "@/types/agreement";
import { getDeviceType } from "@/utils/deviceUtils";

const DELIVERED_INFORMATION = ["기타 주요 공지", "업데이트 소식 및 이벤트"];
const DELIVERY_METHODS = ["이메일"];

function PromptContents() {
  const { isDesktop } = getDeviceType();

  /* 알림 설정 진입 경로가 데스크탑은 프로필 드롭다운, 모바일은 마이페이지라 문구가 달라요. */
  const settingsEntryPoint = isDesktop ? "프로필" : "마이페이지";

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.6rem;
        padding-inline: 1.2rem;
        text-align: left;
      `}
    >
      <Typography variant="title18Bold" color="gray900">
        마케팅 수신 동의를 설정해주세요!
      </Typography>
      <PromptSection title="전달 정보" items={DELIVERED_INFORMATION} />
      <PromptSection title="전송 방법" items={DELIVERY_METHODS} />
      <div
        css={css`
          display: flex;
          align-self: stretch;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          border-radius: 0.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        `}
      >
        <Typography
          variant="subtitle14SemiBold"
          color="gray600"
          css={css`
            white-space: pre-line;
          `}
        >
          <span
            css={css`
              text-decoration-line: underline;
              text-decoration-style: solid;
              text-decoration-skip-ink: none;
              text-underline-position: from-font;
            `}
          >
            마케팅 활용 및 광고 수신
          </span>
          {` 설정은\n‘${settingsEntryPoint} > 설정 > 알림 설정’에서 변경 가능합니다.`}
        </Typography>
      </div>
    </div>
  );
}

function PromptSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Typography
        variant="body15Bold"
        color="gray800"
        css={css`
          display: block;
          margin-bottom: 0.8rem;
        `}
      >
        {title}
      </Typography>
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.4rem;
          padding-left: 1.8rem;
          list-style: disc;
          color: ${DESIGN_TOKEN_COLOR.gray600};
        `}
      >
        {items.map((item) => (
          <li key={item}>
            <Typography variant="body15SemiBold" color="gray600">
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 마케팅 동의를 아직 한 번도 응답하지 않았거나 거절 후 재요청 주기가 지난 회원에게 동의 여부를 물어봐요.
 * 재요청 주기 판단은 서버가 하고, 프론트는 홈 진입 시 결과만 확인해요.
 */
export function MarketingConsentPrompt() {
  const { open } = useModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const hasPromptedRef = useRef(false);

  const { data } = useQuery({
    queryKey: userQueryKeys.marketingPromptRequired,
    queryFn: async () => {
      const res = await api.get<{ promptRequired: boolean }>(`/api/member/agreements/marketing/prompt-required`);
      return res.data;
    },
  });

  const { mutate: patchMarketingAgreement } = useMutation({
    mutationFn: async ({ agreed }: { agreed: boolean }) => {
      const res = await api.patch<MemberAgreement>(`/api/member/agreements/marketing`, { agreed });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.agreements });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.marketingPromptRequired });
    },
    onError: (error) => {
      console.error(error);
      toast.error("서버 에러가 발생했어요!");
    },
  });

  useEffect(() => {
    if (!data?.promptRequired || hasPromptedRef.current) return;

    hasPromptedRef.current = true;
    open({
      title: "",
      contents: <PromptContents />,
      options: { buttonText: ["다음에", "동의하기"] },
      onClose: () => patchMarketingAgreement({ agreed: false }),
      onConfirm: () => patchMarketingAgreement({ agreed: true }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.promptRequired]);

  return null;
}
