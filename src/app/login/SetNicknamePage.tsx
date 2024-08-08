import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

import { Button, ButtonProvider } from "@/component/common/button";
import { Input } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { usePostSignUp } from "@/hooks/api/login/usePostSignUp";
import { useInput } from "@/hooks/useInput";
import { useToast } from "@/hooks/useToast";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { SocialLoginKind } from "@/types/loginType";

export function SetNickNamePage() {
  const { toast } = useToast();
  const { value: nickName, handleInputChange } = useInput("");
  const maxLength = 10;
  const navigate = useNavigate();
  const { mutate: signUpMutation } = usePostSignUp();
  const { socialType } = useParams<{ socialType: SocialLoginKind }>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const accessToken = Cookies.get(`${socialType}AccessToken`) || "";
    if (!accessToken) {
      toast.error("잘못된 접근이에요.");
      navigate("/login");
    }
    signUpMutation({ accessToken, name: nickName, socialType: socialType });
  };

  return (
    <DefaultLayout appBarVisible={false}>
      <Spacing size={8.8} />

      <Typography variant="T4">회고 시작 전,</Typography>
      <Spacing size={0.3} />
      <Typography variant="T4">닉네임을 설정해주세요!</Typography>
      <Spacing size={4} />
      <Input value={nickName} onChange={handleInputChange} placeholder="Text" count={true} maxLength={maxLength} />
      <Spacing size={0.8} />
      <div
        css={css`
          height: 6.6rem;
          background-color: ${DESIGN_SYSTEM_COLOR.blue100};
          border-radius: 0.8rem;
          padding: 1.4rem 1.8rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          justify-content: space-between;
        `}
      >
        <Typography variant="CAPTION" color="blue600">
          TIP
        </Typography>
        <Typography variant="CAPTION" color="blue600">
          실명으로 활동하는 걸 추천해요!
        </Typography>
      </div>

      <ButtonProvider>
        <Button disabled={nickName.length === 0} onClick={handleSubmit}>
          완료
        </Button>
      </ButtonProvider>
    </DefaultLayout>
  );
}
