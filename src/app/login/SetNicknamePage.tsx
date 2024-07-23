import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signUpWithToken } from "@/api/login";
import { Input, InputLabelContainer, Label } from "@/component/common/input";
import { authAtom } from "@/store/auth/authAtom";
import { AuthResponse } from "@/types/loginType";

export function SetNickNamePage() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const [, setAuth] = useAtom(authAtom);

  function setAuthResponse(response: AuthResponse) {
    if (response) {
      Cookies.set("memberId", response.memberId.toString(), { expires: 7 });
      Cookies.set("accessToken", response.accessToken, { expires: 7 });
      setAuth({ isLogin: false, name: response.name, email: response.email, memberRole: response.memberRole });
    }
  }

  // 닉네임 제출 로직
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const kakaoAccessToken = Cookies.get("kakaoAccessToken");
    if (kakaoAccessToken == null) {
      navigate("/login");
    } else {
      const signUpResponse = await signUpWithToken(kakaoAccessToken, nickname);
      console.log(signUpResponse);
      if (signUpResponse && signUpResponse.status === 200) {
        setAuthResponse(signUpResponse.data);
        navigate("/home/retrospect");
      } else {
        console.error("/error");
      }
    }
  };
  return (
    <>
      <h1>닉네임 설정</h1>
      <form onSubmit={handleSubmit}>
        <InputLabelContainer id={"retro"}>
          <Label order={1}>회고 이름</Label>
          <Input
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            value={nickname}
          />
        </InputLabelContainer>
        <button type="submit">제출</button>
      </form>
    </>
  );
}
