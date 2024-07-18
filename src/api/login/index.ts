import axios from "axios";

import { api } from "@/api";

export type KakaoLoginResponse = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

//카카오 서버를 통해 토큰을 발급 받아오는 API 함수
const getKakaoLoginResponse = async (code: string): Promise<KakaoLoginResponse | null> => {
  try {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

    const data = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    };

    const response = await axios.post<KakaoLoginResponse>(`https://kauth.kakao.com/oauth/token`, new URLSearchParams(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (err) {
    console.error("카카오 토근 가져오기 실패", err);
    return null;
  }
};

// 가지고 있는 토큰과 닉네임을 통해 회원가입을 진행하는 코드
const signUpWithKakaoToken = async (accessToken: string, name: string) => {
  try {
    const signUpResponse = await api.post(
      "api/auth/sign-up",
      {
        socialType: "KAKAO",
        name: name,
      },
      {
        headers: {
          "X-Auth-Token": accessToken,
        },
      },
    );
    return signUpResponse;
  } catch (err) {
    console.error("토큰을 통한 회원가입 실패", err);
  }
};

export const signUpKakao = async (code?: string | null) => {
  if (code) {
    const kakaoLoginRespone = await getKakaoLoginResponse(code);
    if (kakaoLoginRespone) {
      //FIXME: 닉네임 변경 필요
      const signUpResponse = await signUpWithKakaoToken(kakaoLoginRespone.access_token, "짱구");
      console.log("성공!!", signUpResponse);
    }
  } else {
    console.log("카카오 인증 실패, 코드를 가져올 수 없음");
  }
};
