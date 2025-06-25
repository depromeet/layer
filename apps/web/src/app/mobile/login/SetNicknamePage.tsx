import Cookies from "js-cookie";

import { Button, ButtonProvider } from "@/component/common/button";
import { Input } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { TipCard } from "@/component/common/tip";
import { Typography } from "@/component/common/typography";
import { usePostSignUp } from "@/hooks/api/login/usePostSignUp";
import { useInput } from "@/hooks/useInput";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { SocialLoginKind } from "@/types/loginType";

export function SetNickNamePage() {
  const { value: nickName, handleInputChange } = useInput("");
  const maxLength = 10;
  const { mutate: signUpMutation, isPending } = usePostSignUp();
  const { socialType } = useRequiredParams<{ socialType: SocialLoginKind }>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const accessToken = Cookies.get(`${socialType}AccessToken`) || "";

    signUpMutation({ accessToken, name: nickName, socialType: socialType });
  };

  return (
    <DefaultLayout appBarVisible={false}>
      <Spacing size={8.8} />

      <Typography variant="T4">회고 시작 전,</Typography>
      <Spacing size={0.3} />
      <Typography variant="T4">닉네임을 설정해주세요!</Typography>
      <Spacing size={4} />
      <Input value={nickName} onChange={handleInputChange} placeholder="닉네임을 입력해주세요" count={true} maxLength={maxLength} />
      <Spacing size={3.6} />
      <TipCard message={"실명으로 활동하는 걸 추천해요!"} />

      <ButtonProvider isProgress={isPending}>
        <Button disabled={nickName.length === 0} onClick={handleSubmit}>
          완료
        </Button>
      </ButtonProvider>
    </DefaultLayout>
  );
}
