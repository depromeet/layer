import axios from "axios";

import { api } from "@/api";
import { KakaoLoginResponse, SignUpResponse, LoginKakaoResult, SignInResponse, SignInReturn } from "@/types/loginType";

// 카카오 서버를 통해 토큰을 발급 받아오는 API 함수
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
    console.error("카카오 토큰 가져오기 실패", err);
    return null;
  }
};

// 가지고 있는 토큰과 닉네임을 통해 회원가입을 진행하는 코드
const signUpWithKakaoToken = async (accessToken: string, name: string): Promise<SignUpResponse | null> => {
  try {
    const response = await api.post<SignUpResponse>(
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
    return response.data;
  } catch (err) {
    console.error("토큰을 통한 회원가입 실패", err);
    return null;
  }
};

// 가지고 있는 토큰과 닉네임을 통해 회원가입을 진행하는 함수
const signInWithKakaoToken = async (accessToken: string): Promise<SignInReturn> => {
  try {
    const response = await api.post<SignInResponse>(
      "api/auth/sign-in",
      {
        socialType: "KAKAO",
      },
      {
        headers: {
          "X-Auth-Token": accessToken,
        },
      },
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    console.error("토큰을 통한 회원가입 실패", err);
    return { status: -1, data: null };
  }
};

export const loginKakao = async (code?: string | null): Promise<LoginKakaoResult> => {
  if (code) {
    const kakaoLoginRespone = await getKakaoLoginResponse(code);
    if (kakaoLoginRespone) {
      //로그인 먼저 시도
      const signInResponse = await signInWithKakaoToken(kakaoLoginRespone.access_token);
      //로그인 성공
      if (signInResponse.status === 200) return { status: "loginSuccess", response: signInResponse.data };
      // 로그인 실패(DB에 회원이 없음) => 회원 가입
      else if (signInResponse.status === 404) {
        const signUpResponse = await signUpWithKakaoToken(kakaoLoginRespone.access_token, "짱구");
        if (signUpResponse === null) return { status: "error", response: null };
        return { status: "signupSuccess", response: signUpResponse };
      }
      return { status: "error", response: null };
    }
  }
  console.log("카카오 인증 실패, 코드를 가져올 수 없음");
  return { status: "error", response: null };
};
