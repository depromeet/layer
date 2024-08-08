import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { KakaoLoginResponse } from "@/types/loginType";

const getKakaoLoginResponse = async (code: string): Promise<KakaoLoginResponse> => {
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
};

export const usePostKakaoToken = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: getKakaoLoginResponse,
    onSuccess: (kakaoLoginResponse: KakaoLoginResponse) => {
      Cookies.set("kakaoAccessToken", kakaoLoginResponse.access_token);
    },
    onError: (error) => {
      console.log("Sign in failed:", error);
      navigate("/login");
    },
  });
};
