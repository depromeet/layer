import Cookies from "js-cookie";

import { Button, ButtonProvider } from "@/component/common/button";
import { Input } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { TipCard } from "@/component/common/tip";
import { Typography } from "@/component/common/typography";
import { isRequiredTermsAgreed, SignUpTermsAgreement } from "@/component/login";
import { usePostSignUp } from "@/hooks/api/login/usePostSignUp";
import { useInput } from "@/hooks/useInput";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { SocialLoginKind } from "@/types/loginType";
import { getDeviceType } from "@/utils/deviceUtils";
import { css } from "@emotion/react";
import { Fragment, useState } from "react";

export function SetNickName() {
  const MAX_LENGTH = 10;
  const { isMobile } = getDeviceType();
  const { value: nickName, handleInputChange } = useInput("");
  const { mutate: signUpMutation, isPending } = usePostSignUp();
  const { socialType } = useRequiredParams<{ socialType: SocialLoginKind }>();

  const [agreedTermIds, setAgreedTermIds] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const accessToken = Cookies.get(`${socialType}AccessToken`) || "";
    signUpMutation({ accessToken, name: nickName, socialType: socialType });
  };

  return (
    <Fragment>
      {isMobile && <Spacing size={8.8} />}
      <Typography variant="T4">회고 시작 전,</Typography>
      <Spacing size={0.3} />
      <Typography variant="T4">닉네임과 약관 동의를 설정해주세요!</Typography>
      <Spacing size={4} />
      <Input value={nickName} onChange={handleInputChange} placeholder="닉네임을 적어주세요" count={true} maxLength={MAX_LENGTH} />
      <Spacing size={3.6} />
      <TipCard message={"실명으로 활동하는 걸 추천해요!"} />

      <div
        css={css`
          margin-top: auto;
        `}
      >
        <SignUpTermsAgreement agreedIds={agreedTermIds} onChange={setAgreedTermIds} />
      </div>

      <ButtonProvider isProgress={isPending}>
        <Button disabled={nickName.length === 0 || !isRequiredTermsAgreed(agreedTermIds)} onClick={handleSubmit}>
          완료
        </Button>
      </ButtonProvider>
    </Fragment>
  );
}

export function SetNickNamePage() {
  return (
    <DefaultLayout appBarVisible={false}>
      <SetNickName />
    </DefaultLayout>
  );
}
