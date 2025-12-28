import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { GoogleLoginResponse } from "@/types/loginType";
import { PATHS } from "@layer/shared";
import { useToast } from "@/hooks/useToast";

const getGoogleLoginResponse = async (code: string): Promise<GoogleLoginResponse> => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string;
  const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI as string;
  const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET as string;
  const data = {
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    client_secret: CLIENT_SECRET,
    code: code,
  };

  const response = await axios.post<GoogleLoginResponse>(`https://oauth2.googleapis.com/token`, new URLSearchParams(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const usePostGoogleToken = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: getGoogleLoginResponse,
    onSuccess: (googleLoginResponse: GoogleLoginResponse) => {
      Cookies.set("googleAccessToken", googleLoginResponse.access_token);
    },
    onError: (error) => {
      toast.error("로그인 중 에러가 발생했습니다.");
      console.log("Sign in failed:", error);
      navigate(PATHS.login());
    },
  });
};
